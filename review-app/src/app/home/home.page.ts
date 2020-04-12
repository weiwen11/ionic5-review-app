import { Component } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { ModalController } from '@ionic/angular';
import { AddReviewPage } from '../add-review/add-review.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  reviews: any = [];

  constructor(public reviewService: ReviewService, public modalCtrl: ModalController) {

  }

  // new ionic lifecycle method. will be called after the page is loaded
  // more info here https://ionicframework.com/docs/angular/lifecycle
  ionViewDidEnter() {
    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });

  }

  async addReview() {
    const modal = await this.modalCtrl.create({
      component: AddReviewPage
    });
    await modal.present();

    // process the data from modal as the modal's call dismiss func 
    // returned is a JSON object, eg { data: { title: 'abc', rating: 50 } }
    // therefore, use { data } (object deconstructing) to extract it
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.reviews.push(data);
      this.reviewService.createReview(data).then(d => {
        this.reviews = d;
      })
    }
  }

  deleteReview(review) {

    //Remove locally
    let index = this.reviews.indexOf(review);

    if (index > -1) {
      this.reviews.splice(index, 1);
    }
    console.log(review);
    //Remove from database
    this.reviewService.deleteReview(review._id);
  }

}
