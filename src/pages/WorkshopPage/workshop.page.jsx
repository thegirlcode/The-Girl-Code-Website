import React from "react";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar.component";
import GlobalStyle from "../globalStyles";
import { GoogleSpreadsheet } from "google-spreadsheet";
import {
  MainHeading,
  HeaderText,
  PinkBoxDiv,
  ImageBox,
  UpcomingWorkshopsDiv,
  PastWorkshopsDiv,
  StartChapterSection,
  DonateSection,
} from "./workshop.page.style";
import Heading from "../../components/Heading/heading.component";
import Card from "../../components/Card/card.component";
import PinkTextBox from "../../components/PinkTextBox/pinktextbox.component";
import WorkshopsImage from "../../assets/WorkshopsImage.jpg";
import WorkshopsHeader from "../../assets/WorkshopsHeader.jpg";
import StartChapter from "../../components/StartChapter/startchapter.component";
import Donate from "../../components/Donate/donate.component";
import Stats from "../../components/Stats/stats.component";
import Footer from "../../components/Footer/footer.component";

class Workshop extends React.Component {
  state = {
    data: [],
    loading: true,
  };

  fetchData = async () => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(
      "1L_Etdeh13tOV5BJvodoV7J8rM3HH3lDWt_CYYvLqKrs"
    );

    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
    });

    // console.log(doc);

    await doc.loadInfo(); // loads document properties and worksheets
    // console.log(doc.title);
    // await doc.updateProperties({ title: "renamed doc" });
    const firstSheet = doc.sheetsByIndex[0];
    const data = await firstSheet.getRows();

    const dataArray = [];

    data.forEach((da) => {
      const { description, title, icons, image, isButton, subtitle } = da;
      dataArray.push({ description, title, icons, image, isButton, subtitle });
    });
    this.setState({ data, loading: false });
    // console.log(dataArray);

    // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    // console.log(sheet.title);
    // console.log(sheet.rowCount);

    // // adding / removing sheets
    // const newSheet = await doc.addSheet({ title: "hot new sheet!" });
    // await newSheet.delete();
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { data, loading } = this.state;
    console.log(data);
    const cards = data.map((card) => (
      <Col sm={12} md={6} lg={6} key={card.title}>
        <Card
          image={card.image}
          icons={card.icons}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          isButton={card.isButton}
        />
      </Col>
    ));
    return (
      <>
        <GlobalStyle />
        <NavBar
          bgOut="transparent"
          bgIn="#F05680"
          textOut="#F05680"
          textIn="#F05680"
        />
        <Container style={{ paddingTop: "8rem" }}>
          <Row>
            <Col md={7}>
              <Image src={WorkshopsHeader} alt="Join Us" fluid />
            </Col>
            <Col md={5}>
              <MainHeading>Our Workshops </MainHeading>
              <HeaderText>
                We seek to inspire girls to discover and pursue programming.
              </HeaderText>
            </Col>
          </Row>
        </Container>
        <Stats
          stats={[
            ["70", "FLAGSHIP STAT1"],
            ["400+", "FLAGSHIP STAT2"],
            ["35", "FLAGSHIP STAT3"],
          ]}
        />
        <ImageBox>
          <Heading heading={"COVID RESPONSE"} />
          <Image
            src={WorkshopsImage}
            fluid
            style={{ maxHeight: "60vh", padding: "0.5rem 1rem" }}
          />
        </ImageBox>
        <PinkBoxDiv>
          <PinkTextBox
            heading={"MISSION"}
            text={
              "At The Girl Code, we aim to bridge the gender gap in the tech community by inspiring young girls to learn programming by hosting workshops at schools and universities local to them. Through our platform and intuitive curriculum, we plan to give rise to a new generation of female programmers set to take the world by storm."
            }
          />
        </PinkBoxDiv>
        <UpcomingWorkshopsDiv>
          <Heading heading={"PAST WORKSHOPS"} />
          {loading ? (
            <Spinner animation="border" variant="danger" className="mt-5" />
          ) : (
            <Row className="mt-5">{cards}</Row>
          )}
        </UpcomingWorkshopsDiv>

        <PastWorkshopsDiv>
          <Heading heading={"UPCOMING WORKSHOPS"} />
          {loading ? (
            <Spinner animation="border" variant="danger" className="mt-5" />
          ) : (
            <Row className="mt-5">{cards}</Row>
          )}
        </PastWorkshopsDiv>

        <StartChapterSection>
          <Heading heading={"Start a chapter"} />
          <StartChapter />
        </StartChapterSection>
        <DonateSection>
          <Donate
            title={"Help support The Girl Code"}
            content={
              "At The Girl Code, we aim to bridge the gender gap in the tech community by inspiring young girls to learn programming by hosting workshops."
            }
            button={"Donate Now"}
          />
        </DonateSection>
        <Footer />
      </>
    );
  }
}

export default Workshop;
