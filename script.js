const display = document.getElementById('display');

// 1. Validasi Real-Time: Memblokir input huruf dari keyboard
display.addEventListener('input', function (e) {
    // Regex: Hanya mengizinkan angka (0-9) dan simbol operator matematika
    const invalidChars = /[^0-9+\-*/%.()]/g;
    
    // Jika user mengetik huruf, karakter tersebut langsung dihapus
    if (invalidChars.test(this.value)) {
        this.value = this.value.replace(invalidChars, '');
    }
});

// 2. Dukungan tombol 'Enter' pada keyboard untuk mengeksekusi perhitungan
display.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        calculateResult();
    }
});

function appendCharacter(char) {
    if (display.value === '0' || display.value.startsWith('Error')) {
        display.value = char;
    } else {
        display.value += char;
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    if (!display.value.startsWith('Error')) {
        display.value = display.value.slice(0, -1);
        if (display.value === '') display.value = '0';
    } else {
        clearDisplay();
    }
}

function calculateSquareRoot() {
    try {
        let val = parseFloat(display.value);
        if (val < 0) {
            display.value = 'Error: Invalid Input';
            return;
        }
        display.value = Math.sqrt(val);
    } catch (error) {
        display.value = 'Error: Invalid Input';
    }
}

function calculateSquare() {
    try {
        let val = parseFloat(display.value);
        let result = val * val;
        
        if (result > 999999999) {
            display.value = 'Error: Out of range';
            return;
        }
        display.value = result;
    } catch (error) {
        display.value = 'Error: Invalid Input';
    }
}

function calculateResult() {
    try {
        let expression = display.value;
        
        // Aturan BVA Batas Bawah: Mencegah pembagian dengan nol
        if (expression.includes('/0')) {
            display.value = 'Error: Cannot divide by zero';
            return;
        }

        // Eksekusi perhitungan utama
        let result = eval(expression);

        // Aturan BVA Batas Atas: Maksimal hasil 9 digit
        if (result > 999999999) {
            display.value = 'Error: Out of range';
            return;
        }

        // Memotong desimal panjang agar tampilan tetap rapi
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(6));
        }

        display.value = result;
    } catch (error) {
        // Fallback jika format rumus matematika salah ketik (misal: 5++5)
        display.value = 'Error: Invalid Formula';
    }
}