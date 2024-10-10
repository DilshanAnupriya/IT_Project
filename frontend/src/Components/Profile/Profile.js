import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function ProfilePage() {
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="#">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  {[
                    { icon: 'globe', text: 'https://mdbootstrap.com' },
                    { icon: 'github', text: 'mdbootstrap', style: { color: '#333333' } },
                    { icon: 'twitter', text: '@mdbootstrap', style: { color: '#55acee' } },
                    { icon: 'instagram', text: 'mdbootstrap', style: { color: '#ac2bac' } },
                    { icon: 'facebook', text: 'mdbootstrap', style: { color: '#3b5998' } },
                  ].map((item, index) => (
                    <MDBListGroupItem key={index} className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fab icon={item.icon} style={item.style} className="fa-lg" />
                      <MDBCardText>{item.text}</MDBCardText>
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {[
                  { label: 'Full Name', value: 'Johnatan Smith' },
                  { label: 'Email', value: 'example@example.com' },
                  { label: 'Phone', value: '(097) 234-5678' },
                  { label: 'Mobile', value: '(098) 765-4321' },
                  { label: 'Address', value: 'Bay Area, San Francisco, CA' },
                ].map((item, index) => (
                  <div key={index}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{item.label}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{item.value}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </div>
                ))}
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              {Array.from({ length: 2 }, (_, index) => (
                <MDBCol md="6" key={index}>
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <MDBCardText className="mb-4">
                        <span className="text-primary font-italic me-1">assignment</span> Project Status
                      </MDBCardText>
                      {[
                        { name: 'Web Design', progress: 80 },
                        { name: 'Website Markup', progress: 72 },
                        { name: 'One Page', progress: 89 },
                        { name: 'Mobile Template', progress: 55 },
                        { name: 'Backend API', progress: 66 },
                      ].map((project, index) => (
                        <div key={index}>
                          <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                            {project.name}
                          </MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar width={project.progress} valuemin={0} valuemax={100} />
                          </MDBProgress>
                        </div>
                      ))}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
