// Implement Queue using Arrays (FIFO)
// https://takeuforward.org/plus/dsa/problems/implement-queue-using-arrays

/**
 * Creates a queue using array (functional approach)
 * @param {number} capacity - Maximum capacity of the queue
 * @returns {Object} Queue operations
 */
function createArrayQueue(capacity = 1000) {
    const arr = new Array(capacity);
    let front = 0;
    let rear = 0;
    let count = 0;

    function enqueue(x) {
        if (count === capacity) {
            throw new Error("Queue overflow");
        }
        arr[rear] = x;
        rear = (rear + 1) % capacity;
        count++;
    }

    function dequeue() {
        if (isEmpty()) {
            throw new Error("Queue underflow");
        }
        const item = arr[front];
        front = (front + 1) % capacity;
        count--;
        return item;
    }

    function peek() {
        if (isEmpty()) {
            throw new Error("Queue is empty");
        }
        return arr[front];
    }

    function isEmpty() {
        return count === 0;
    }

    function size() {
        return count;
    }

    return { enqueue, dequeue, peek, isEmpty, size };
}

// Test cases
const queue = createArrayQueue();
queue.enqueue(5);
queue.enqueue(10);
console.log(queue.peek()); // 5
console.log(queue.dequeue()); // 5
console.log(queue.isEmpty()); // false
console.log(queue.size()); // 1
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.dequeue()); // 10
console.log(queue.peek()); // 20
