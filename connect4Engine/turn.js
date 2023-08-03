function nextTurn(bd, col, self) {
    for (let i = bd.length - 1; i >= 0; i--) {
        if (bd[i][col] == 0) {
            bd[i][col] = self ? 1 : -1;
            return bd;
        }
    }
}

function undo(bd, col) {
    for (let i = 0; i < bd.length; i++) {
        if (bd[i][col] != 0) {
            bd[i][col] = 0;
            return bd;
        }
    }
    return false;
}