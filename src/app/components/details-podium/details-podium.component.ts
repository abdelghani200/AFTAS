import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'autoprefixer';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { Ranking } from 'src/app/shared/models/Ranking';

@Component({
  selector: 'app-details-podium',
  templateUrl: './details-podium.component.html',
  styleUrls: ['./details-podium.component.css']
})
export class DetailsPodiumComponent implements OnInit{

  podium!: Ranking[];

  code: string | null = null;

  constructor(private servicePodium: RankingService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
      console.log(this.code);
      if (this.code) {
        this.displaydetails(this.code);
      }
    });
  }

  displaydetails(code: String) {
    this.servicePodium.getRank(code).subscribe(
      data => {
        this.podium = data.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
        console.log(data);
      }
    );
  }
  

}
