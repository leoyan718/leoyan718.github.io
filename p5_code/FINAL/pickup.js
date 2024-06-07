class Pickup {

constructor(x, y, size = 0.1) {
    this.sprite = createSprite(x, y);
    this.sprite.addImage(pickupImage);
    this.sprite.scale = size;
  }

  show() {
    drawSprite(this.sprite);
  }

  checkHit(player) {
    return this.sprite.overlap(player);
  }

  destroy() {
    this.sprite.remove();
    sound1.play();
  }
}