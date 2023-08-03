function checkLine(a, b, c = null, d = null) {
    if (c != null && d != null) {
        return a != 0 && a == b && a == c && a == d;
    } else if (c != null) {
        return a != 0 && a == b && a == c;
    }
    return a != 0 && a == b;
}

function checkValidCols(bd) {
    let validCols = [];
    for (let i = 0; i < 9; i++) {
        if (bd[0][i] == 0) {
            validCols.push(i);
        }
    }
    return validCols;
}

function checkWin(bd) {
    //up
    for (let i = 6; i > 2; i--) {
        for (let j = 0; j < 9; j++) {
            if (checkLine(bd[i][j], bd[i - 1][j], bd[i - 2][j], bd[i - 3][j])) {
                return bd[i][j];
            }
        }
    }
    //right
    for (let i = 6; i >= 0; i--) {
        for (let j = 0; j < 6; j++) {
            if (checkLine(bd[i][j], bd[i][j + 1], bd[i][j + 2], bd[i][j + 3])) {
                return bd[i][j];
            }
        }
    }
    //up-right
    for (let i = 6; i > 2; i--) {
        for (let j = 0; j < 6; j++) {
            if (
                checkLine(
                    bd[i][j],
                    bd[i - 1][j + 1],
                    bd[i - 2][j + 2],
                    bd[i - 3][j + 3]
                )
            ) {
                return bd[i][j];
            }
        }
    }
    //up-left
    for (let i = 6; i > 2; i--) {
        for (let j = 8; j > 2; j--) {
            if (
                checkLine(
                    bd[i][j],
                    bd[i - 1][j - 1],
                    bd[i - 2][j - 2],
                    bd[i - 3][j - 3]
                )
            ) {
                return bd[i][j];
            }
        }
    }
    return 0;
}

function evaluate3(bd) {
    let value = 0;
    //check rows (left - right)
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (checkLine(bd[i][j], bd[i][j + 1], bd[i][j + 2])) {
                value += bd[i][j] * 1000;
                if (j == 0) {
                    value -= bd[i][j] * 500;
                } else if (bd[i][j - 1] == -bd[i][j]) {
                    value -= bd[i][j] * 500;
                } else if (i < 6 && bd[i + 1][j - 1] == 0) {
                    value -= bd[i][j] * 400;
                }
                if (j == 6) {
                    value -= bd[i][j] * 500;
                } else if (bd[i][j + 3] == -bd[i][j]) {
                    value -= bd[i][j] * 500;
                } else if (i < 6 && bd[i + 1][j + 3] == 0) {
                    value -= bd[i][j] * 400;
                }
            }
        }
    }
    //check cols (top - down);
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 9; j++) {
            if (checkLine(bd[i][j], bd[i + 1][j], bd[i + 2][j])) {
                value += bd[i][j] * 1000;
                if (i == 0) {
                    value -= bd[i][j] * 500;
                } else if (bd[i - 1][j] == -bd[i][j]) {
                    value -= bd[i][j] * 500;
                }
                if (i == 4) {
                    value -= bd[i][j] * 500;
                } else if (bd[i + 3][j] == -bd[i][j]) {
                    value -= bd[i][j] * 500;
                }
            }
        }
    }
    //down - right
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 7; j++) {
            if (checkLine(bd[i][j], bd[i + 1][j + 1], bd[i + 2][j + 2])) {
                value += bd[i][j] * 1000;
                if (i == 0 || j == 0) {
                    value -= bd[i][j] * 500;
                } else if (bd[i - 1][j - 1] == -bd[i][j]) {
                    value -= bd[i][j] * 500;
                } else if (bd[i][j - 1] == 0) {
                    value -= bd[i][j] * 400;
                }
                if (i == 4 || j == 6) {
                    value -= bd[i][j] * 500;
                } else if (bd[i + 3][j + 3] == -bd[i][j]) {
                    value -= bd[i][j] * 500;
                } else if (i < 3 && bd[i + 4][j + 3] == 0) {
                    value -= bd[i][j] * 400;
                }
            }
        }
    }

    //down - left
    for (let i = 0; i < 5; i++) {
        for (let j = 8; j > 1; j--) {
            if (checkLine(bd[i][j], bd[i + 1][j - 1], bd[i + 2][j - 2])) {
                value += bd[i][j] * 1000;
                if (i == 0 || j == 8) {
                    value -= bd[i][j] * 500;
                } else if (bd[i - 1][j + 1] == -bd[i][j]) {
                    value -= bd[i][j] * 500;
                } else if (bd[i][j + 1] == 0) {
                    value -= bd[i][j] * 400;
                }
                if (i == 4 || j == 2) {
                    value -= bd[i][j] * 500;
                } else if (bd[i + 3][j - 3] == -bd[i][j]) {
                    value -= bd[i][j] * 500;
                } else if (i < 3 && bd[i + 4][j - 3] == 0) {
                    value -= bd[i][j] * 400;
                }
            }
        }
    }
    return value;
}

function evaluate2(bd) {
    let value = 0;
    //check rows (left - right)
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            if (checkLine(bd[i][j], bd[i][j + 1])) {
                value += bd[i][j] * 10;
                if (j == 0) {
                    value -= bd[i][j] * 5;
                } else if (bd[i][j - 1] == -bd[i][j]) {
                    value -= bd[i][j] * 5;
                }
                if (j == 7) {
                    value -= bd[i][j] * 5;
                } else if (bd[i][j + 2] == -bd[i][j]) {
                    value -= bd[i][j] * 5;
                }
            }
        }
    }
    //check cols (top - down);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 9; j++) {
            if (checkLine(bd[i][j], bd[i + 1][j])) {
                value += bd[i][j] * 10;
                if (i == 0) {
                    value -= bd[i][j] * 5;
                } else if (bd[i - 1][j] == -bd[i][j]) {
                    value -= bd[i][j] * 5;
                }
                if (i == 5) {
                    value -= bd[i][j] * 5;
                } else if (bd[i + 2][j] == -bd[i][j]) {
                    value -= bd[i][j] * 5;
                }
            }
        }
    }
    //down - right
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (checkLine(bd[i][j], bd[i + 1][j + 1])) {
                value += bd[i][j] * 10;
                if (i == 0 || j == 0) {
                    value -= bd[i][j] * 5;
                } else if (bd[i - 1][j - 1] == -bd[i][j]) {
                    value -= bd[i][j] * 5;
                }
                if (i == 5 || j == 7) {
                    value -= bd[i][j] * 5;
                } else if (bd[i + 2][j + 2] == -bd[i][j]) {
                    value -= bd[i][j] * 5;
                }
            }
        }
    }

    //down - left
    for (let i = 0; i < 6; i++) {
        for (let j = 8; j > 0; j--) {
            if (checkLine(bd[i][j], bd[i + 1][j - 1])) {
                value += bd[i][j] * 10;
                if (i == 0 || j == 8) {
                    value -= bd[i][j] * 5;
                } else if (bd[i - 1][j + 1] == -bd[i][j]) {
                    value -= bd[i][j] * 5;
                }
                if (i == 5 || j == 1) {
                    value -= bd[i][j] * 5;
                } else if (bd[i + 2][j - 2] == -bd[i][j]) {
                    value -= bd[i][j] * 5;
                }
            }
        }
    }
    return value;
}

function boardEvaluation(bd) {
    return evaluate3(bd) + evaluate2(bd);
}

function checkWinBoard(bd) {
    //up
    for (let i = 6; i > 2; i--) {
        for (let j = 0; j < 9; j++) {
            if (checkLine(bd[i][j], bd[i - 1][j], bd[i - 2][j], bd[i - 3][j])) {
                return { y1: i, y2: i - 3, x1: j, x2: j };
            }
        }
    }
    //right
    for (let i = 6; i >= 0; i--) {
        for (let j = 0; j < 6; j++) {
            if (checkLine(bd[i][j], bd[i][j + 1], bd[i][j + 2], bd[i][j + 3])) {
                return { y1: i, y2: i, x1: j, x2: j + 3 };
            }
        }
    }
    //up-right
    for (let i = 6; i > 2; i--) {
        for (let j = 0; j < 6; j++) {
            if (
                checkLine(
                    bd[i][j],
                    bd[i - 1][j + 1],
                    bd[i - 2][j + 2],
                    bd[i - 3][j + 3]
                )
            ) {
                return { y1: i, y2: i - 3, x1: j, x2: j + 3 };
            }
        }
    }
    //up-left
    for (let i = 6; i > 2; i--) {
        for (let j = 8; j > 2; j--) {
            if (
                checkLine(
                    bd[i][j],
                    bd[i - 1][j - 1],
                    bd[i - 2][j - 2],
                    bd[i - 3][j - 3]
                )
            ) {
                return { y1: i, y2: i - 3, x1: j, x2: j - 3 };
            }
        }
    }
    return 0;
}