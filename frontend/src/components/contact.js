import React from 'react'
import ReactGA from 'react-ga'
const ContactModal = () => {
  const trackClick = action => {
    return () => {
      ReactGA.event({
        category: 'Contact_Your_MP_Modal',
        action: action
      })
    }

  return (


    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">


          <iframe id="dogooder" allowTransparency="true" style="box-sizing:border-box; min-width:300px; width:550px; max-width:100%;" src="https://best-for-britain.good.do/DemandYourVote/Contact_Your_MP/?embedded=" scrolling="no" frameborder="0">
          <p>Your browser does not support iframes. Please visit <a href="https://best-for-britain.good.do/DemandYourVote/Contact_Your_MP/">https://best-for-britain.good.do/DemandYourVote/Contact_Your_MP/</a></p></iframe>
          <script>if(!window.jQuery){document.write('<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"><\/script>');}</script>
          <script type="text/javascript" src="//static.good.do/static/js/jquery.iframeResizer.7d04fe8f6f93.js"></script>
          <script type="text/javascript" src="//static.good.do/embed.js"></script>

           </div>
         </div>
       </div>
     </div>


}


)
