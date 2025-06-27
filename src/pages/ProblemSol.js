import {
  Row,
  Col,
  Card,
  Typography,
} from "antd";

// Images
import problemGraph from "../assets/images/problem-graph.png"; 
import solutionDevice from "../assets/images/solution-device.png"; 

const { Title, Paragraph } = Typography;


function ProblemSol() {
  // const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Problem Statement
                </Title>
              }
              headStyle={{
                borderBottom: "1px solid #f0f0f0",
                marginBottom: "16px",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <div className="table-responsive">
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} md={12}>
                    <div style={{ paddingRight: "20px" }}>
                      <Paragraph style={{ fontSize: "16px", lineHeight: "1.8", color: "#333" }}>
                        Coastal zones, vital for ecological balance and human
                        livelihoods, are increasingly exploited as dumping
                        grounds for sewage, industrial waste and toxic
                        materials due to rapid urbanization, industrialization
                        and inadequate waste management. This pollution
                        cascade disrupts urbanization plans, paralyzes
                        transportation networks and inflicts severe economic
                        losses on nations, particularly in developing regions.
                      </Paragraph>
                      <Paragraph style={{ fontSize: "16px", lineHeight: "1.8", color: "#333" }}>
                        Nigeria faces a growing public health and
                        environmental crisis due to deteriorating air quality
                        driven by high concentrations of carbon monoxide
                        (CO), carbon dioxide (CO₂), particulate matter (PM),
                        and ozone-depleting emissions. According to IQAir
                        2024, Nigeria ranks among the most polluted
                        countries in Africa, with annual average PM2.5 levels
                        in major cities such as Lagos and Port Harcourt
                        exceeding 5 times the WHO recommended limits.
                      </Paragraph>
                      <Paragraph style={{ fontSize: "16px", lineHeight: "1.8", color: "#333" }}>
                        Castal erosion in West Africa has become a critical and escalating
                        challenge, threatening economic stability, environmental
                        sustainability, and social well-being across the region. Between
                        2010 and 2024, erosion has caused annual losses estimated at $2–
                        4 billion, damaging key infrastructure, reducing tourism revenues,
                        and displacing vulnerable communities.
                        The degradation of coastal ecosystems—such as mangroves and
                        wetlands—has led to habitat loss and declining biodiversity, while
                        saltwater intrusion and shoreline retreat have undermined
                        agriculture and food security. Without urgent and
                        coordinated action, the socioeconomic and ecological impacts of
                        coastal erosion will continue to intensify, putting millions of
                        livelihoods and national economies at risk
                      </Paragraph>
                      <Paragraph style={{ fontSize: "16px", lineHeight: "1.8", color: "#333" }}>
                        Lagos, Nigeria’s largest coastal city, is facing an alarming rate of
                        relative sea level rise driven by a combination of global and local
                        factors. Satellite altimetry data show that sea levels in the Gulf of
                        Guinea have risen by approximately 3–4 mm per year from 1993
                        to 2021. However, this global trend is further intensified locally
                        by land subsidence, with InSAR and GPS measurements
                        indicating that parts of Lagos are sinking at rates of 5–9 mm per
                        year. This compounding effect significantly increases the risk of
                        coastal flooding, infrastructure damage, and population
                        displacement. Despite the growing threat, Nigeria lacks a robust
                        coastal monitoring system—tide gauges, GNSS stations, and IoT-
                        based sensor networks remain limited or non-operational across
                        much of the coastline. As a result, early warning capabilities and
                        long-term planning are severely constrained, leaving urban
                        populations increasingly vulnerable to sea level rise and its socio-
                        economic impacts.
                      </Paragraph>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div style={{
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                      padding: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

                      backgroundColor: "#fff",
                      width: "100%",
                      height: "650px"
                    }}>
                      <img 
                        src={problemGraph} 
                        alt="Problem Graph" 
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          borderRadius: "4px",
                          display: "block",
                          objectFit: "fill",
                        }} 
                      />
                      <p style={{
                        textAlign: "center",
                        marginTop: "10px",
                        color: "#666",
                        fontSize: "14px"
                      }}>
                        Visualization of coastal erosion and pollution impacts
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Proposed Solution
                </Title>
              }
              headStyle={{
                borderBottom: "1px solid #f0f0f0",
                marginBottom: "16px",
              }}
              bodyStyle={{ padding: "24px" }}
            >
              <div className="table-responsive">
                <Row gutter={[24, 24]} align="middle">
                  <Col xs={24} md={12}>
                    <div style={{
                      border: "1px solid #f0f0f0",
                      borderRadius: "8px",
                      padding: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

                      backgroundColor: "#fff",
                      width: "80%",
                      height: "650px"
                    }}>
                      <img 
                        src={solutionDevice} 
                        alt="Problem Graph" 
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          borderRadius: "4px",
                          display: "block",
                          objectFit: "fill",
                        }} 
                      />
                      <p style={{
                        textAlign: "center",
                        marginTop: "10px",
                        color: "#666",
                        fontSize: "14px"
                      }}>
                        3d Visualization of proposed solution
                      </p>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div style={{ paddingRight: "20px" }}>
                      <Paragraph style={{ fontSize: "16px", lineHeight: "1.8", color: "#333" }}>
                        West African countries is experiencing accelerated relative sea level rise driven by global
                        ocean warming and significant local land subsidence—measured at up to 9 mm/year in some
                        areas. Satellite altimetry indicates sea levels have risen by about 3–4 mm/year since the early
                        1990s. However, the absence of a robust, ground-based coastal monitoring infrastructure—
                        including tide gauges, GNSS stations, and real-time sensors—limits the country’s ability to
                        assess hazards and respond proactively. This data gap severely hampers flood forecasting,
                        urban planning, and climate resilience initiatives.
                        To address this challenge, we propose an integrated coastal monitoring system that
                        combines Earth Observation (EO) data from satellites with IoT-based sensors. This
                        hybrid system will enable real-time tracking of sea-level changes, predict flooding, erosion
                        and salt water intrusion across western africa. By merging satellite altimetry and InSAR
                        data with smart tide gauges and GNSS-linked IoT nodes, the platform will generate high-
                        resolution, continuous data streams. These insights will support early warning systems,
                        inform coastal infrastructure development, and strengthen decision-making for disaster risk
                        reduction and climate adaptation
                      </Paragraph>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProblemSol;