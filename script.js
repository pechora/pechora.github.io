const plaintextElement = document.getElementById('plaintext');
const ciphertextElement = document.getElementById('ciphertext');
const keyElement = document.getElementById('key');

var plaintextEdited = false;

var charArray = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
charArray = charArray.concat([' ', '.', ',', '!', '?', ':', ';', '"', '\'', '-', '_', '+', '=', '%', '$', '#', '@', '&', '\\', '(', ')', '`', '\n']);

Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
  };

const plainTextChangeHandler = () => {
    var plaintext = plaintextElement.value.trim();
    var key = keyElement.value.trim().toLowerCase();

    if (plaintext === '' || key === '') {
        ciphertextElement.value = '';
    } else {
        ciphertextElement.value = encrypt(plaintext, key);
    }

    plaintextEdited = true;
}

const cypherTextChangeHandler = () => {
    var cypherText = ciphertextElement.value.trim();
    var key = keyElement.value.trim().toLowerCase();

    if (cypherText === '' || key === '') {
        plaintextElement.value = '';
    } else {
        plaintextElement.value = decrypt(cypherText, key);
    }

    plaintextEdited = false;
}

const keyChangeHandler = () => {
    var plaintext = plaintextElement.value.trim();
    var cypherText = ciphertextElement.value.trim();
    var key = keyElement.value.trim().toLowerCase();

    if (plaintext !== '' && plaintextEdited) {
        ciphertextElement.value = encrypt(plaintext, key);
    } else if (cypherText !== '' && !plaintextEdited) {
        plaintextElement.value = decrypt(cypherText, key);
    }
}

const encrypt = (plaintext, key) => {
    var result = plaintext.split('');

    result.forEach((element, index, array) => {
        var lookupIndex = charArray.indexOf(element);

        if (lookupIndex !== -1) {
            array[index] = charArray[(lookupIndex + key.charCodeAt(index % key.length)) % charArray.length];

            if (array[index] === '\n') {
                array[index] = '~';
            }
        } else {
            array[index] = '^';
        }
    });

    return result.join('');
}

const decrypt = (cypherText, key) => {
    var result = cypherText.split('');

    result.forEach((element, index, array) => {
        if (element === '~') {
            array[index] = '\n';
            element = '\n';
        }

        var lookupIndex = charArray.indexOf(element);

        if (lookupIndex !== -1) {
            array[index] = charArray[(lookupIndex - key.charCodeAt(index % key.length)).mod(charArray.length)];
        } else {
            array[index] = '^';
        }
    });

    return result.join('');
}