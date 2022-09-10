import React from 'react';

export default function Loader() {

  return(
  	<div className="authLoader loadingstart">
			<svg className="spinner" viewBox="0 0 50 50">
				<circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
			</svg>
    </div>  
  );
}
