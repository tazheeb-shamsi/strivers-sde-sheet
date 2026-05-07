class ArrayQueue {

    private int[] arr; // array to store elements
    private int front; // points to the front element
    private int rear; // points to the last element
    private int size; // current size of the queue
    private int capacity; // maximum capacity of the queue

    // Constructor
    public ArrayQueue() {
        capacity = 1000; // default capacity, can be adjusted
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }

    // Add element to the end of the queue
    public void push(int x) {
        if (size == capacity) {
            throw new RuntimeException("Queue is full");
        }
        rear = (rear + 1) % capacity; // circular increment
        arr[rear] = x;
        size++;
    }

    // Removes and returns the front element
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        int val = arr[front];
        front = (front + 1) % capacity; // circular increment
        size--;
        return val;
    }

    // Returns the front element without removing it
    public int peek() {
        if (isEmpty()) {
            throw new RuntimeException("Queue is empty");
        }
        return arr[front];
    }

    // Returns the size of the queue
    public int size() {
        return size;
    }

    // Returns true if the queue is empty
    public boolean isEmpty() {
        return size == 0;
    }

    // Driver test
    public static void main(String[] args) {
        ArrayQueue queue = new ArrayQueue();
        queue.push(1);
        queue.push(3);
        System.out.println(queue.pop()); // Output: 1
        System.out.println(queue.peek()); // Output: 3
        System.err.println(queue.size()); // Output: 1
        System.out.println(queue.isEmpty()); // Output: false
    }
}
