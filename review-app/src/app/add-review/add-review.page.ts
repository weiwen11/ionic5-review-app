import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {

  title: any;
  description: any;
  rating: any;

  constructor(public modalCtrl: ModalController) {

  }

  save(): void {

    let review = {
      title: this.title,
      description: this.description,
      rating: this.rating
    };

    this.modalCtrl.dismiss(review);

  }

  close(): void {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
