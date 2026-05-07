// 165. Compare Version Numbers
// https://leetcode.com/problems/compare-version-numbers/

// Compare two version strings version1 and version2.
// Return -1 if version1 < version2, 1 if version1 > version2, 0 if equal.

/**
 * Compare two version numbers
 * @param {string} version1 - First version string
 * @param {string} version2 - Second version string
 * @returns {number} - -1, 0, or 1
 */
function compareVersion(version1, version2) {
    const v1 = version1.split('.');
    const v2 = version2.split('.');

    let i = 0;
    let j = 0;

    while (i < v1.length || j < v2.length) {
        const num1 = i < v1.length ? parseInt(v1[i], 10) : 0;
        const num2 = j < v2.length ? parseInt(v2[j], 10) : 0;

        if (num1 < num2) return -1;
        if (num1 > num2) return 1;

        i++;
        j++;
    }

    return 0;
}

// Test cases
console.log(compareVersion("1.01", "1.001")); // 0 (1.1 == 1.1)
console.log(compareVersion("1.0", "1.0.0")); // 0
console.log(compareVersion("0.1", "1.1")); // -1
console.log(compareVersion("1.0.1", "1")); // 1
console.log(compareVersion("7.5.2.4", "7.5.3")); // -1
console.log(compareVersion("1.2", "1.10")); // -1