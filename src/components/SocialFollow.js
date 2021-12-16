import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
    return (
        <div class="social-container">
            <h3>Social Follow</h3>
            <a href="https://www.youtube.com/watch?v=FTUYbv4ilMI"
                className="youtube social">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://www.facebook.com/mccall.butler1"
                className="facebook social">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.twitter.com/mccallbutler" className="twitter social">
                 <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com/mickeybeemakeup/"
                className="instagram social">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>


        </div>
    );
}
