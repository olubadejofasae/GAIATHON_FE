import {
  Row,
  Col,
  Card,
  Descriptions,
} from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import futaLogo from "../assets/images/futa.png";
import gaiaLogo from "../assets/images/GAIA.png";

function Teams() {
  return (
    <>
      <div className="logo-banner" style={{ background: '#f0f2f5', padding: '40px 0' }}>
        <Row justify="center" align="middle" gutter={[40, 0]}>
          <Col>
            <img 
              src={gaiaLogo} 
              alt="GAIA Logo" 
              style={{ height: '80px', width: 'auto', maxWidth: '100%' }}
            />
          </Col>
          <Col>
            <img 
              src={futaLogo} 
              alt="FUTA Logo" 
              style={{ height: '80px', width: 'auto', maxWidth: '100%' }}
            />
          </Col>
        </Row>
      </div>

      <Card
        className=""
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="center" align="middle" style={{ marginBottom: "20px" }}>
            <Col span={24} className="text-center">
              <div className="avatar-info">
                <h2 className="font-bold mb-2 text-4xl md:text-5xl">TEAM_FUTA</h2>
                <h1 className="font-semibold text-xl md:text-2xl text-blue-600 dark:text-blue-300">
                  Federal University Of Technology, Akure
                </h1>
              </div>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold">Jaiyeola Emmanuel</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark " style={{paddingLeft:"10px"}}>
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).{" "}
            </p>
            <hr className="my-25"/>
            <Descriptions title="Embedded Systems and IOT Expert" style={{paddingLeft:"10px"}}>
              <Descriptions.Item label="Department:" span={3}>
                Electrical and Electronics Engineering
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                (+234) 706 313 5499
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                atolase120@gmail.com
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Olubadejo Cornelius Fasae</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark " style={{paddingLeft:"10px"}}>
              {" "}
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).{" "}
            </p>
            <hr className="my-25"/>
            <Descriptions title="AI and Software Expert" style={{paddingLeft:"10px"}}>
              <Descriptions.Item label="Department:" span={3}>
                Computer Engineering
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                (+234) 816 181 9934
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                fasaeolubadejo@mail.com
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Ogunyileka Feranmi</h6>}
            className="header-solid h-full card-profile-information"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark " style={{paddingLeft:"10px"}}>
              {" "}
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).{" "}
            </p>
            <hr className="my-25"/>
            <Descriptions title="Product Design Expert" style={{paddingLeft:"10px"}}>
              <Descriptions.Item label="Department:" span={3}>
                Electrical and Electronics Engineering
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                (+234) 706 706 0287
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                isaacogunyileka@gmail.com
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#pablo" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#pablo" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Teams;