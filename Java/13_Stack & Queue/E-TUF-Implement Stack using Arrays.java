// Implement stack using array (LIFO)
// https://takeuforward.org/plus/dsa/problems/implement-stack-using-arrays

class ArrayStack {
    private int[] arr;    // array to store elements
    private int top;      // index of the top element
    private int capacity; // maximum capacity of the stack

    // Constructor
    public ArrayStack() {
        capacity = 1000; // default capacity (can be adjusted)
        arr = new int[capacity];
        top = -1; // stack starts empty
    }

    // Push element onto stack
    public void push(int x) {
        if (top == capacity - 1) {
            throw new RuntimeException("Stack overflow");
        }
        arr[++top] = x;
    }

    // Pop element from stack
    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack underflow");
        }
        return arr[top--];
    }

    // Get top element without removing it
    public int top() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is empty");
        }
        return arr[top];
    }

    // Check if stack is empty
    public boolean isEmpty() {
        return top == -1;
    }

    // Driver test
    public static void main(String[] args) {
        ArrayStack stack = new ArrayStack();
        stack.push(5);
        stack.push(10);
        System.out.println(stack.top());     // Output: 10
        System.out.println(stack.pop());     // Output: 10
        System.out.println(stack.isEmpty()); // Output: false
    }
}
