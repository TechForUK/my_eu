import React from 'react'

const SignsModal = () => {
  return (
    <div
      id="my-eu-signs-modal"
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="my-eu-signs-modal-title"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="my-eu-signs-modal-title">
              Add a Project
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" id="my-eu-signs-modal-body" />
        </div>
      </div>
    </div>
  )
}

export default SignsModal
