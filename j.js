let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".resetbutton");
let newbutton = document.querySelector(".newbutton");
let msgcontainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let isGameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (isGameOver || box.innerText !== "") return;

        box.innerText = turn0 ? "O" : "X";
        box.disabled = true;
        checkWinner();
        turn0 = !turn0;
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    isGameOver = false;
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
    isGameOver = true;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const val1 = boxes[a].innerText;
        const val2 = boxes[b].innerText;
        const val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            showWinner(val1);
            return;
        }
    }

    // Check for draw
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") allFilled = false;
    });

    if (allFilled) {
        msg.innerText = "🤝 It's a draw!";
        msgcontainer.classList.remove("hide");
        isGameOver = true;
    }
};

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

newbutton.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
