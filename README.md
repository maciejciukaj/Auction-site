# 🚗 Auction-site ⌛



## Functionalities
- Adding automotive  auctions and advertisements
- Editing user data with the possibility of changing the password
- Forms with client-side and server-side validation
- Auction photos displayed in carousel with preview option
- Timer counting down to the end of the auction
- Track the progress of the auction along with informing participants of price changes
- Sub-pages with auctions added by user and bids he has placed on other auctions
- Password recovery via link sent to users email
- Hashing and salting passwords
- [JWT](https://jwt.io/introduction)-based service authorization
- Data stored using [PostgreSQL](https://www.postgresql.org/) and [Firebase](https://firebase.google.com/)

## Setup

Open two terminals and run following scripts:

*Server* :

```shell
> cd API
> dotnet watch run
```

*Client* :

```shell
> cd client
> ng serve
```
*Url* :
```shell
https://localhost:4200
```
## Technologies

<ul>

**.NET**:  6.0

**Angular**: 12.2.17

**PostgreSQL** 14.4

</ul>

## 🚧 TODO 🚧

- Add signalR library and related functionalities

- Password recovery via link sent to users email

