// Flattening of a LinkedList
// https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1

// Definition for multi-level linked list node.
function createNode(data) {
    return { data: data,
        next: null,
        bottom: null };
}

/**
 * @param {Node} head
 * @return {Node}
 */
function flatten(head) {
    if (head === null || head.next === null) return head;

    // Flatten the next part first
    head.next = flatten(head.next);

    // Merge current list with flattened next list
    head = merge(head, head.next);

    return head;
}

function merge(a, b) {
    if (a === null) return b;
    if (b === null) return a;

    const dummy = createNode(0);
    let tail = dummy;

    while (a !== null && b !== null) {
        if (a.data < b.data) {
            tail.bottom = a;
            a = a.bottom;
        } else {
            tail.bottom = b;
            b = b.bottom;
        }
        tail = tail.bottom;
    }

    tail.bottom = a !== null ? a : b;
    return dummy.bottom;
}

// Create test linked list
const head = createNode(5);
head.next = createNode(10);
head.next.next = createNode(19);
head.next.next.next = createNode(28);

head.bottom = createNode(7);
head.bottom.bottom = createNode(8);
head.bottom.bottom.bottom = createNode(30);

head.next.bottom = createNode(20);

head.next.next.bottom = createNode(22);
head.next.next.bottom.bottom = createNode(50);

head.next.next.next.bottom = createNode(35);
head.next.next.next.bottom.bottom = createNode(40);
head.next.next.next.bottom.bottom.bottom = createNode(45);

let flattened = flatten(head);
const result = [];
while (flattened !== null) {
    result.push(flattened.data);
    flattened = flattened.bottom;
}
console.log(result); // Output: [5, 7, 8, 10, 19, 20, 22, 28, 30, 35, 40, 45, 50]
