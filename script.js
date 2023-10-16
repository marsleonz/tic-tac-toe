console.log("tictactoe");

const gameBoard = (() => {
  let _board = new Array(9);
  let _count = 0;
  const setMarker = (index, marker) => {
    _board[index] = marker;
    console.log(_board);
    _count++;
  };
  const resetBoard = () => {
    _board = new Array(9);
    _count = 0;
  };
  const checkWinner = (marker) => {
    const winBoard = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    if (
      winBoard.some((elem) =>
        elem.every((insideElem) => _board[insideElem] === "X")
      ) ||
      winBoard.some((elem) =>
        elem.every((insideElem) => _board[insideElem] === "O")
      )
    ) {
      console.log("winner", marker);
      return true;
    } else if (_count === 9) {
      return "tie";
    }
  };
  return { setMarker, checkWinner, resetBoard };
})();

const displayController = (() => {
  const displaycontroller = ["controller"];
  const boxes = document.querySelectorAll(".box");
  console.log(boxes);
  let marker = "X";
  const selectMarker = document.querySelectorAll(".mark");
  selectMarker.forEach((mark) =>
    mark.addEventListener("click", (e) => {
      restart();
      marker = e.target.textContent;
      info.textContent = `${marker}'s Turn`;
    })
  );
  const restart = () => {
    gameBoard.resetBoard();
    boxes.forEach((box) => (box.textContent = ""));
    marker = "X";
    info.textContent = `${marker}'s Turn`;
    boxes.forEach((box) => box.addEventListener("click", clickHandler));
  };

  let info = document.querySelector(".info");

  const displayWinner = (marker) => {
    boxes.forEach((box) => {
      box.removeEventListener("click", clickHandler);
    });
    info.textContent = `${marker} is the winner`;
  };
  const reset = document.querySelector("#reset");
  reset.addEventListener("click", () => restart());
  let result = "";
  const clickHandler = (e) => {
    const box = e.currentTarget;
    console.log(box.id);
    if (box.textContent === "") {
      gameBoard.setMarker(box.id, marker);
      box.textContent = marker;
      result = gameBoard.checkWinner(marker);
      if (result == true) {
        displayWinner(marker);
      } else if (result == "tie") {
        info.textContent = "Game is tied";
      } else {
        marker === "X" ? (marker = "O") : (marker = "X");
        info.textContent = `${marker}'s Turn`;
      }
    }
  };
  boxes.forEach((box) => box.addEventListener("click", clickHandler));
  return { displaycontroller };
})();

const player = (name) => {
  const playerName = name;
  return { playerName };
};
console.log(displayController.displaycontroller);
const newPlayer = player("ram");
console.log(newPlayer.playerName);

console.log(newPlayer.playerName);
