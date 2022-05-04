$RESULT = document.getElementById('result');
$UPPER = document.getElementById('Up');
$LOWER = document.getElementById('Lw');
$SPECIAL = document.getElementById('Sp');
$NUMBERS = document.getElementById('Dg');
$PASSLEN = document.getElementById('pass');

function rndNumber(max_val) { // random integer
    while (true) {
        let randomInt = Math.round(Math.random() * 100)
        if (randomInt <= max_val) {
            return randomInt
        }
    }
}

function generate() {
    let total_string = ''
    let upper = $UPPER.checked ? 'QWERTYUIOPASDFGHJKLZXCVBNM': ''
    let lower = $LOWER.checked ? 'qwertyuiopasdfghjklzxcvbnm': ''
    let special = $SPECIAL.checked ? '+=,~`|/-!?.': ''
    let digits = $NUMBERS.checked ? '0123456789': ''

    total_string = upper + lower + special + digits

    let passwd = null
    if (total_string.length > 0) {
        passwd = ''

        for (let i=0; i< Number($PASSLEN.value); i++) {
            let rndNum = rndNumber(total_string.length)
            let char = total_string.charAt(rndNum);

            if (passwd.indexOf(char) === -1) { // prevent duplicated symbols
                passwd += char
            } else {
                i -= 1
            }
        }
    }
    $RESULT.value = passwd
}

generate();

function copyToClipboard(e) {
    navigator.clipboard.writeText($RESULT.value).then(()=>{}, (err)=>console.error(err))
}
