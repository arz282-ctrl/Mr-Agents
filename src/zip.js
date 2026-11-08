import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

/**
 * Creates a standard PKZIP archive from an array of file entries:
 * entries: Array<{ name: string, content: Buffer | string }>
 * outZipPath: string
 */
export function createZipArchive(entries, outZipPath) {
  const localHeaders = [];
  const centralHeaders = [];
  let offset = 0;

  for (const { name, content } of entries) {
    const nameBuf = Buffer.from(name.split(path.sep).join('/'), 'utf-8');
    const uncompressed = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const uncompressedSize = uncompressed.length;
    const crc = (zlib.crc32(uncompressed) >>> 0);
    const compressed = zlib.deflateRawSync(uncompressed);
    const compressedSize = compressed.length;

    // Local Header (30 bytes + name length)
    const local = Buffer.alloc(30 + nameBuf.length);
    local.writeUInt32LE(0x04034b50, 0); // Local file header signature
    local.writeUInt16LE(20, 4);         // Version needed: 2.0
    local.writeUInt16LE(0, 6);          // Flags: 0
    local.writeUInt16LE(8, 8);          // Compression: Deflate
    local.writeUInt16LE(0, 10);         // Last mod time
    local.writeUInt16LE(0, 12);         // Last mod date
    local.writeUInt32LE(crc, 14);       // CRC-32
    local.writeUInt32LE(compressedSize, 18);
    local.writeUInt32LE(uncompressedSize, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);         // Extra field length
    nameBuf.copy(local, 30);

    localHeaders.push(local, compressed);

    // Central Directory Header (46 bytes + name length)
    const central = Buffer.alloc(46 + nameBuf.length);
    central.writeUInt32LE(0x02014b50, 0); // Central header signature
    central.writeUInt16LE(20, 4);          // Version made by
    central.writeUInt16LE(20, 6);          // Version needed
    central.writeUInt16LE(0, 8);           // Flags
    central.writeUInt16LE(8, 10);          // Compression
    central.writeUInt16LE(0, 12);          // Time
    central.writeUInt16LE(0, 14);          // Date
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressedSize, 20);
    central.writeUInt32LE(uncompressedSize, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt16LE(0, 30);          // Extra len
    central.writeUInt16LE(0, 32);          // Comment len
    central.writeUInt16LE(0, 34);          // Disk num
    central.writeUInt16LE(0, 36);          // Int attr
    central.writeUInt32LE(((0o100644 << 16) >>> 0), 38); // Ext attr (standard regular file)
    central.writeUInt32LE(offset, 42);     // Offset of local header
    nameBuf.copy(central, 46);

    centralHeaders.push(central);
    offset += local.length + compressed.length;
  }

  const centralDirOffset = offset;
  let centralDirSize = 0;
  for (const c of centralHeaders) centralDirSize += c.length;

  // End of Central Directory Record (22 bytes)
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);              // Disk number
  eocd.writeUInt16LE(0, 6);              // Disk where central dir starts
  eocd.writeUInt16LE(entries.length, 8); // Central dir records on disk
  eocd.writeUInt16LE(entries.length, 10);// Total records
  eocd.writeUInt32LE(centralDirSize, 12);
  eocd.writeUInt32LE(centralDirOffset, 16);
  eocd.writeUInt16LE(0, 20);             // Comment length

  const finalZip = Buffer.concat([...localHeaders, ...centralHeaders, eocd]);
  fs.mkdirSync(path.dirname(outZipPath), { recursive: true });
  fs.writeFileSync(outZipPath, finalZip);
}
