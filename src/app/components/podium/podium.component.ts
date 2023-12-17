import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'autoprefixer';
import { RankingService } from 'src/app/services/ranking/ranking.service';
import { Ranking } from 'src/app/shared/models/Ranking';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {

  podium!: Ranking[];

  competitionCode: string = '';


  constructor(private http: HttpClient, private serviceRanking: RankingService, private router: Router) { }


  ngOnInit(): void {
    this.displayPodium()
  }


  displayPodium() {
    this.serviceRanking.getRankByCompetition().subscribe(
      data => {
        if (data && typeof data === 'object') {
          // Extract competition codes from object keys
          const competitionCodes = Object.keys(data);

          // Assign competition codes to the podium array
          this.podium = competitionCodes.map(competitionCode => ({
            competitionCode,
            // You can add other properties if needed
          }));

          console.log(this.podium)
        } else {
          console.error('Invalid data format or missing object.');
        }
      },
      error => {
        console.error('Error fetching podium:', error);
      }
    );
  }




  navigateToDetails(id: String | undefined) {
    this.router.navigate(['/resultats', id]);
  }



}
