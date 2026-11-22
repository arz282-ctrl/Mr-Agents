import Redis from "ioredis";
import { EventEmitter } from "node:events";

// In-memory fallback event bus
class LocalEventBus extends EventEmitter {
  private queue: Map<string, any[]> = new Map();

  enqueue(queueName: string, item: any) {
    if (!this.queue.has(queueName)) {
      this.queue.set(queueName, []);
    }
    this.queue.get(queueName)!.push(item);
    this.emit(`item:${queueName}`, item);
  }

  dequeue(queueName: string): any | null {
    const list = this.queue.get(queueName);
    if (!list || list.length === 0) return null;
    return list.shift();
  }
}

const localBus = new LocalEventBus();

let redisClient: Redis | null = null;
let isRedisConnected = false;

// Attempt Redis connection if REDIS_URL is configured
if (process.env.REDIS_URL) {
  try {
    const client = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      lazyConnect: true,
    });

    client
      .connect()
      .then(() => {
        redisClient = client;
        isRedisConnected = true;
        console.log("[Queue] Connected to Redis successfully.");
      })
      .catch((err) => {
        console.warn("[Queue] Redis connection failed, falling back to in-memory event bus:", err.message);
      });
  } catch (err: any) {
    console.warn("[Queue] Redis init error, using local fallback:", err.message);
  }
}

export interface SwarmEvent {
  swarmRunId: string;
  type: "init" | "plan" | "agent_message" | "tool_call" | "tool_result" | "complete" | "error";
  fromPersona?: string;
  toPersona?: string;
  content?: string;
  toolName?: string;
  toolPayload?: any;
  toolResult?: any;
  timestamp: number;
}

export async function publishSwarmEvent(event: SwarmEvent) {
  const channel = `swarm:${event.swarmRunId}`;
  if (isRedisConnected && redisClient) {
    try {
      await redisClient.publish(channel, JSON.stringify(event));
    } catch {
      localBus.emit(channel, event);
    }
  } else {
    localBus.emit(channel, event);
  }
}

export function subscribeSwarmEvents(
  swarmRunId: string,
  onEvent: (event: SwarmEvent) => void
): () => void {
  const channel = `swarm:${swarmRunId}`;

  const listener = (event: SwarmEvent) => {
    onEvent(event);
  };

  localBus.on(channel, listener);

  return () => {
    localBus.off(channel, listener);
  };
}

export function isUsingRedis(): boolean {
  return isRedisConnected;
}
