function bestMove() {
    let bestScore = -Infinity;
    let bestmove;
    let validCols = checkValidCols(board);
    let values = [];
    for (let col of validCols) {
        board = nextTurn(board, col, true);
        //board.forEach(x => console.log(x.join(' ')))
        let score = minimaxab(board, depthSlider.value(), -Infinity, Infinity, false);

        undo(board, col);
        //favour cols close to center
        let centerBias = col < 4 ? col * 2 : col > 4 ? (8 - col) * 2 : 8;

        score += centerBias;

        values.push(score);

        if (score > bestScore) {
            bestScore = score;
            bestmove = col;
        }
    }
    //console.log(values.join(" "));
    currentPlayer = true;
    return bestmove;
}

function minimaxab(bd, depth, alpha, beta, isMaximising) {
    let winner = checkWin(bd);
    if (winner != 0) {
        return winner * 100000 + winner * depth * 10000;
    }
    if (depth == 0) {
        let evaluationOfBoard = boardEvaluation(bd);
        return evaluationOfBoard;
    }
    let validCols = checkValidCols(bd);
    if (isMaximising) {
        let bestScore = -Infinity;
        for (let col of validCols) {
            nextTurn(bd, col, true);
            bestScore = max(
                bestScore,
                minimaxab(bd, depth - 1, alpha, beta, false)
            );

            undo(bd, col);
            if (bestScore > beta) {
                break;
            }
            alpha = max(alpha, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let col of validCols) {
            nextTurn(bd, col, false);
            bestScore = min(
                bestScore,
                minimaxab(bd, depth - 1, alpha, beta, true)
            );
            undo(bd, col);
            if (bestScore < alpha) {
                break;
            }
            beta = min(beta, bestScore);
        }
        return bestScore;
    }
}