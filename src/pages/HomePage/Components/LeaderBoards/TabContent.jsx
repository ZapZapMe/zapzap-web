import React from 'react';
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import { Tabs } from '../../constants';

const sampleAvatar =
  'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';

const TabContent = ({ tabName }) => {
  const state = useSelector((state) => state.homePage);
  const { leaderboardReceived = [], leaderboardSent = [] } = state;

  console.log(state);

  const list =
    tabName === Tabs.RECEIVED ? leaderboardReceived : leaderboardSent;

  return (
    <ListGroup as="ol" className="w-100 mt-4 zz-list" numbered>
      {list.map((item, index) => (
        <ListGroup.Item
          as="li"
          className="d-flex p-3 justify-content-between align-items-center"
          key={index}
        >
          <img
            className="zz-avatar"
            src={item.avatar_url ?? sampleAvatar}
            alt={
              tabName === Tabs.RECEIVED ? item.tip_recipient : item.tip_sender
            }
          />
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              <a
                href={`http://x.com/${
                  tabName === Tabs.RECEIVED
                    ? item.tip_recipient
                    : item.tip_sender
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                @
                {tabName === Tabs.RECEIVED
                  ? item.tip_recipient
                  : item.tip_sender}
              </a>
            </div>
          </div>
          <Badge bg="primary" pill>
            {item.total_amount_sats}
          </Badge>
          <span className="ms-2 fw-bold">sat</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TabContent;
