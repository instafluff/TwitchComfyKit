function updateBlock(hex) {
    $('#color').css('background-color', hex);
}

function getRandomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

$(function() {
    $('#cycle').prop('disabled', false);

    $('#cycle').click(function() {
      updateBlock(getRandomColor());
    });
});
