import React from 'react'
import ReactGA from 'react-ga'

const AddYourStory = () => {
  const trackShare = () => {
    ReactGA.event({
      category: 'Share',
      action: 'Tell Your Story'
    })
  }

  return (
    <div className="my-eu-sidebar-cta">
      <h2>Tell Your Story</h2>
      <p>
        We&apos;ve added lots of projects to our map, but there are many more!
        Is there a <a href="/about">dataset</a> we&apos;re missing? Were you
        involved in an EU funded project that isn&apos;t on the map? Do you have
        a personal story about the EU?
      </p>
      <p>
        <a
          className="btn btn-contact"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfFuSkjkvuXWX70mHJJJrQlU4Ew6GKGd2XFLzGmZGLZbvFKfw/viewform?usp=sf_link"
          onClick={trackShare}
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tell us about it!
        </a>
      </p>
    </div>
  )
}

export default AddYourStory
