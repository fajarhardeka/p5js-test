let arcs = [];

function setup() {
  createCanvas(400, 400);
  // Membuat dua arc, satu dari kiri atas dan satu dari kanan bawah
  arcs.push(new Arc(0, 0, 2, 2));
  arcs.push(new Arc(width, height, -2, -2));
}

function draw() {
  background(0);

  // Warna
  noStroke();
  fill(255, 255, 0);

  // Kecepatan animasi
  let biteSize = PI / 16;
  let startAngle = biteSize * sin(frameCount * 0.5) + biteSize;
  let endAngle = TWO_PI - startAngle;

  // Update dan gambar semua arc
  for (let arc of arcs) {
    arc.update();
    arc.display(startAngle, endAngle);
  }
}

class Arc {
  constructor(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Balik arah jika mencapai batas kanvas dan reset posisi jika mencapai salah satu sudut
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.resetPosition();
    }
  }

  display(startAngle, endAngle) {
    arc(this.x, this.y, 80, 80, startAngle, endAngle, PIE);
  }

  resetPosition() {
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      let corner = int(random(4));
      switch (corner) {
        case 0:
          // Kiri atas
          this.x = 0;
          this.y = 0;
          this.xSpeed = 2;
          this.ySpeed = 2;
          break;
        case 1:
          // Kanan atas
          this.x = width;
          this.y = 0;
          this.xSpeed = -2;
          this.ySpeed = 2;
          break;
        case 2:
          // Kiri bawah
          this.x = 0;
          this.y = height;
          this.xSpeed = 2;
          this.ySpeed = -2;
          break;
        case 3:
          // Kanan bawah
          this.x = width;
          this.y = height;
          this.xSpeed = -2;
          this.ySpeed = -2;
          break;
      }
    }
  }
}
