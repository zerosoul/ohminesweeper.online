import React from "react";

// type Props = {};

const Rank = () => {
  return (
    <section className="window-body w-full fsh">
      <p>Rank:</p>
      <menu role="tablist">
        <li role="tab" aria-selected="true">
          <a href="#tabs">Today</a>
        </li>
        <li role="tab">
          <a href="#tabs">Week</a>
        </li>
        <li role="tab">
          <a href="#tabs">Moth</a>
        </li>
      </menu>
      <div className="window" role="tabpanel">
        <div className="window-body">
          <p>the tab content</p>
        </div>
      </div>
    </section>
  );
};

export default Rank;
