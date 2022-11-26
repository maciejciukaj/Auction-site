import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  hubUrl = environment.hubUrl;
  public data: any = 'new price';
  public connectionId: string;
  public bradcastedData: 'price';
  private hubConnection: HubConnection;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  public startConnection = (groupName: string) => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/auction', {
        accessTokenFactory: () =>
          JSON.parse(localStorage.getItem('user')).token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started, groupName: ', groupName))
      .then(() => {
        this.getConnectionId(),
          this.hubConnection
            .invoke('addtogroup', groupName)
            .then(() => {
              console.log('connected to group:', groupName);
            })
            .catch((err) => console.log(err));
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  private getConnectionId = () => {
    this.hubConnection.invoke('getconnectionid').then((data) => {
      console.log(data);
      this.connectionId = data;
    });
  };

  public broadcastBidData = (groupName: string) => {
    this.hubConnection
      .invoke('broadcasttogroup', groupName)
      .catch((err) => console.log(err));
  };

  sendBidMessage(fn: any) {
    this.hubConnection.on('broadcasttogroup', () => {
      this.toastr.success('Price updated', 'Refresh page');
      fn();
    });
  }

  stopHubConnection() {
    this.hubConnection.stop().catch((err) => console.log(err));
  }
}
