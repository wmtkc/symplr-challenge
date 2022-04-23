import React from 'react'
import './userCard.css';

function UserCard({data}: {data: any}) {
    //console.log(data);
    const fullName = data.name.first + ' ' + data.name.last;
    return (
      <div className="user-card">
            <div className="user-profile">
                <div className="image-container">
                    <img src={data.picture.medium} alt={fullName} />
                    </div>
                <div className="info-container">
                    <div className="name">{fullName}</div>
                    <div className="gender">{data.gender}</div>
                    <div className="email"><a href={'mailto:' + data.email}>{data.email}</a></div>
                    <div className="address">
                        <span>{data.location.street.number + ' ' + data.location.street.name + ', '}</span>
                        <span>{data.location.city + ', ' + data.location.state + ' ' + data.location.postcode + ', '}</span>
                        <span>{data.location.country}</span>
                    </div>
                    <div className="xkcd">
                        <a href={'https://xkcd.com/' + data.xkcd} target="_blank" rel="noreferrer">Relevant XKCD</a>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <a href={'tel:' + data.phone}>
                    <button className="phone">{data.phone}</button>
                </a>
            </div>
      </div>
    )
}

export default UserCard