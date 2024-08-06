// queue.js
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
    console.log(`Task enqueued: ${item.description}`);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const item = this.items.shift();
    console.log(`Task dequeued: ${item.description}`);
    return item;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

export default Queue;
