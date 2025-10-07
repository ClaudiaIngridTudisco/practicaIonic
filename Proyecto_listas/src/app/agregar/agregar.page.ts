import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class AgregarPage implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

}
