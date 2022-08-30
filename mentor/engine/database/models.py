from datetime import datetime
from engine import db
from engine.helpers.service_helper import ServiceHelper
from engine.helpers.const.service_characteristics import (
    TYPE,
    REGIONS,
    DEPLOYMENT_TIME,
    LEASING_PERIOD,
)
import random
from sqlalchemy_imageattach.entity import Image, image_attachment
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_imageattach.context import store_context
from engine import store
import base64

Base = declarative_base()


### Service Models ####################################################################################################


class Review(db.Model):
    """Service Review model"""

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"))
    fileName = db.Column(db.Text, nullable=False)
    fileData = db.Column(db.LargeBinary)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "fileName": self.fileName,
            "rating": self.rating,
            "comment": self.comment,
        }


class Service(db.Model):
    """Service model"""

    id = db.Column(db.Integer, primary_key=True)
    providerName = db.Column(db.String(100), nullable=False)
    serviceHash = db.Column(db.String(100), unique=True)
    txHash = db.Column(db.String(100))
    serviceName = db.Column(db.String(100), nullable=False)
    image = image_attachment("ServiceImage")
    imageName = db.Column(db.String(30), default="default.png")
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.PickleType, nullable=False)
    features = db.Column(db.PickleType, nullable=False)
    region = db.Column(db.PickleType, nullable=False)
    deployment = db.Column(db.Text, nullable=False)
    leasingPeriod = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    currency = db.Column(db.Text, nullable=False, default="USD")
    reviews = db.relationship("Review", backref="service", lazy="dynamic")
    mitigationRate = db.Column(db.Integer, nullable=True)
    __tablename__ = "service"

    def serialize(
        self,
        cosine_similarity="",
        jaccard_similarity="",
        euclidean_distance="",
        manhattan_distance="",
        pearson_correlation="",
        minkowski_distance="",
        weighted_similarity=[],
    ):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "providerName": self.providerName,
            "serviceName": self.serviceName,
            "serviceHash": self.serviceHash,
            "txHash": self.txHash,
            "image": base64.b64encode(self.image.make_blob()).decode("utf-8"),
            "description": self.description,
            "type": self.type,
            "features": self.features,
            "region": self.region,
            "deployment": self.deployment,
            "leasingPeriod": self.leasingPeriod,
            "price": self.price,
            "currency": self.currency,
            "reviews": [r.serialize for r in self.reviews],
            "cosineSimilarity": cosine_similarity,
            "jaccardSimilarity": jaccard_similarity,
            "euclideanDistance": euclidean_distance,
            "manhattanDistance": manhattan_distance,
            "pearsonCorrelation": pearson_correlation,
            "minkowskiDistance": minkowski_distance,
            "weightedSimilarity": weighted_similarity,
            "mitigationRate": self.mitigationRate,
        }

    def json_to_obj(self, json):
        self.providerName = json["provider"]
        self.serviceName = json["productName"]
        self.description = json["description"]
        self.image = json["logo"]
        self.imageName = json["fileName"]
        self.region = json["region"]
        self.type = json["serviceType"]
        self.features = json["attackType"]
        self.deployment = json["deploymentTime"]
        self.leasingPeriod = json["leasingPeriod"]
        self.price = json["price"]
        self.txHash = json["txHash"]
        self.serviceHash = json["serviceHash"]
        self.mitigationRate = json["mitigationRate"]
        return self

    def form_to_obj(self, form, file):
        self.providerName = form["provider"]
        self.serviceName = form["productName"]
        self.description = form["description"]
        self.imageName = file.filename
        self.region = form["region"].split()
        self.type = form["serviceType"].split()
        self.features = form["attackType"].split()
        self.deployment = form["deploymentTime"]
        self.leasingPeriod = form["leasingPeriod"]
        self.price = form["price"]
        self.txHash = form["txHash"]
        self.serviceHash = form["serviceHash"]
        self.mitigationRate = form["mitigationRate"]
        return self

    def __repr__(self):
        return f"Service('{self.serviceName}', '{self.type}', '{self.region}', '{self.price}', '{self.currency}', '{self.txHash}', '{self.serviceHash}', '{self.mitigationRate}')"


class ServiceImage(db.Model, Image):
    """Service Service Image model"""

    service_id = db.Column(db.Integer, db.ForeignKey("service.id"), primary_key=True)
    service = db.relationship("Service")
    __tablename__ = "service_image"


### Customer Models ####################################################################################################


class CustomerProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    region = db.Column(db.PickleType, nullable=False)
    serviceType = db.Column(db.PickleType, nullable=False)
    attackType = db.Column(db.PickleType, nullable=False)
    deploymentTime = db.Column(db.Text, nullable=False, default=datetime.utcnow)
    deploymentTimeWeight = db.Column(db.Integer, nullable=False)
    leasingPeriod = db.Column(db.PickleType, nullable=False)
    leasingPeriodWeight = db.Column(db.PickleType, nullable=False)
    budget = db.Column(db.Integer, nullable=False)
    budgetWeight = db.Column(db.Integer, nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            "region": self.region,
            "serviceType": self.serviceType,
            "attackType": self.attackType,
            "deploymentTime": self.deploymentTime,
            "deploymentTimeWeight": self.deploymentTimeWeight,
            "leasingPeriod": self.leasingPeriod,
            "leasingPeriodWeight": self.leasingPeriodWeight,
            "budget": self.budget,
            "budgetWeight": self.budgetWeight,
        }

    def __repr__(self):
        return f"CustomerProfile('{self.region}', '{self.serviceType}', '{self.deploymentTime}', '{self.leasingPeriod}', '{self.budget}', '{self.attackType}')"

    def json_to_obj(self, json):
        self.region = json["region"]
        self.serviceType = json["serviceType"]
        self.attackType = json["attackType"]
        self.deploymentTime = json["deploymentTime"]
        self.deploymentTimeWeight = json["deploymentTimeWeight"]
        self.leasingPeriod = json["leasingPeriod"]
        self.leasingPeriodWeight = json["leasingPeriodWeight"]
        self.budget = json["budget"]
        self.budgetWeight = json["budgetWeight"]
        return self


########################################################################################################################


def load_data(app, db):
    service1 = Service(
        providerName="Akamai",
        serviceName="Kona Site Defender",
        serviceHash="hash1",
        imageName="akamai.png",
        description="Kona Site Defender combines automated DDoS mitigation with a highly "
        "scalable and accurate WAF to protect websites from a wide range of online threats,"
        "including network- and application-layer DDoS, SQL injection and XSS attacks –"
        " without compromising the user experience. Kona Site Defender can stop the largest"
        "attacks and leverages Akamai’s visibility into global web traffic to help "
        "organizations respond to the latest threats",
        type=["PROACTIVE"],
        features=["VOLUMETRIC", "PROTOCOL", "APPLICATION LAYER", "SSL", "DNS"],
        region=["NORTH AMERICA", "SOUTH AMERICA", "EUROPE"],
        deployment="SECONDS",
        leasingPeriod="MINUTES",
        price=3500,
        currency="USD",
        mitigationRate=0.7,
    )

    service2 = Service(
        providerName="CloudFlare",
        serviceName="Advanced DDoS Attack Protection",
        serviceHash="hash2",
        imageName="cloudflare.png",
        description="Cloudflare’s advanced DDoS protection, provisioned as a service at the network "
        "edge, matches the sophistication and scale of such threats, and can be used to "
        "mitigate DDoS attacks of all forms and sizes including those that target the UDP "
        "and ICMP protocols, as well as SYN/ACK, DNS amplification and Layer 7 attacks",
        type=["PROACTIVE"],
        features=["VOLUMETRIC", "PROTOCOL", "APPLICATION", "DNS"],
        region=["NORTH AMERICA", "SOUTH AMERICA", "EUROPE"],
        deployment="SECONDS",
        leasingPeriod="MONTHS",
        price=4900,
        currency="USD",
        mitigationRate=0.8,
    )

    service3 = Service(
        providerName="Imperva",
        serviceName="Incapsula",
        serviceHash="hash3",
        imageName="imperva.png",
        description="The Imperva Incapsula service delivers a multi-faceted approach to DDoS defense, "
        "providing blanket protection from all DDoS attacks to shield your critical "
        "online assets from these threats. Incapsula DDoS protection services are backed "
        "by a 24x7 security team, 99.999% uptime SLA, and a powerful, global network of "
        "data centers.",
        type=["PROACTIVE"],
        features=["VOLUMETRIC", "PROTOCOL", "APPLICATION", "SSL", "DNS"],
        region=["NORTH AMERICA", "SOUTH AMERICA", "EUROPE"],
        deployment="SECONDS",
        leasingPeriod="DAYS",
        price=4500,
        currency="USD",
        mitigationRate=0.7,
    )

    service4 = Service(
        providerName="Verisign",
        serviceName="Verisign DDoS Protection Service",
        serviceHash="hash4",
        imageName="verisign.png",
        description="Verisign DDoS Protection Services help organisations reduce the risk of "
        "catastrophic DDoS attacks by detecting and filtering malicious traffic aimed at "
        "disrupting or disabling their internet-based services. Unlike traditional security"
        " solutions, Verisign DDoS Protection Services filter harmful traffic upstream of "
        "the organisational network or in the cloud",
        type=["PROACTIVE"],
        features=["VOLUMETRIC", "PROTOCOL", "APPLICATION", "SSL", "DNS"],
        region=["NORTH AMERICA", "SOUTH AMERICA", "EUROPE"],
        deployment="SECONDS",
        leasingPeriod="MONTHS",
        price=3700,
        currency="USD",
        mitigationRate=0.8,
    )

    service5 = Service(
        providerName="Arbor Networks",
        serviceName="Arbor Cloud",
        serviceHash="hash5",
        imageName="arbor.png",
        description="Arbor Cloud is a DDoS service powered by the world’s leading experts in DDoS "
        "mitigation, together with the most widely deployed DDoS protection technology",
        type=["PROACTIVE"],
        features=["VOLUMETRIC", "PROTOCOL", "APPLICATION" "SSL", "DNS"],
        region=["NORTH AMERICA", "SOUTH AMERICA", "EUROPE"],
        deployment="DAYS",
        leasingPeriod="MONTHS",
        price=3000,
        currency="USD",
        mitigationRate=0.7,
    )

    service6 = Service(
        providerName="Check Point Software Technologies",
        serviceName="DDos Protector",
        serviceHash="hash6",
        imageName="checkPoint.png",
        description="Check Point DDoS Protector™Appliances block Denial of Service attacks within "
        "seconds with multi-layered protection and up to 40 Gbps of performance. Modern "
        "DDoS attacks use new techniques to exploit areas where traditional security "
        "solutions are not equipped to protect. These attacks can cause serious network "
        "downtime to businesses who rely on networks and Web services to operate. DDoS "
        "Protectors extend company’s security perimeters to block destructive DDoS attacks "
        "before they cause damage.",
        type=["REACTIVE"],
        features=["APPLICATION", "DNS"],
        region=["NORTH AMERICA", "SOUTH AMERICA", "EUROPE", "ASIA"],
        deployment="SECONDS",
        leasingPeriod="DAYS",
        price=2400,
        currency="USD",
        mitigationRate=0.8,
    )

    service7 = Service(
        providerName="Corero Network Security, Inc.",
        serviceName="SmartWall® Threat Defense System",
        serviceHash="hash7",
        imageName="corero.png",
        description="The Corero SmartWall Threat Defense System (TDS) delivers comprehensive DDoS "
        "protection, eliminating attacks automatically and in real-time.The SmartWall "
        "Network Threat Defense (NTD) solutions include innovative technology for the "
        "mitigation of DDoS attacks of all sizes, including stealthy sub-saturating "
        "attacks, in seconds vs minutes (in contrast to legacy DDoS solutions), allowing "
        "good user traffic to flow uninterrupted and enabling applications and services to "
        "remain online, continuously, even whilst under attack",
        type=["REACTIVE"],
        features=["APPLICATION", "VOLUMETRIC"],
        region=["NORTH AMERICA", "SOUTH AMERICA", "EUROPE", "ASIA"],
        deployment="SECONDS",
        leasingPeriod="MINUTES",
        price=3200,
        currency="USD",
        mitigationRate=0.7,
    )

    service8 = Service(
        providerName="Flowmon Networks",
        serviceName="Flowmon DDoS Defender",
        serviceHash="hash8",
        imageName="flowmon.png",
        description="Flowmon DDoS Defender puts advanced artificial intelligence between your critical "
        "systems and criminals. Without any changes in infrastructure, in a matter of "
        "minutes, network and security engineers will have up-and-running active DDoS "
        "protection",
        type=["REACTIVE"],
        features=["APPLICATION"],
        region=["NORTH AMERICA", "SOUTH AMERICA", "EUROPE", "ASIA"],
        deployment="SECONDS",
        leasingPeriod="MONTHS",
        price=2345,
        currency="USD",
        mitigationRate=0.8,
    )

    service9 = Service(
        providerName="Level 3 Communications",
        serviceName="Level 3 DDos Mitigation",
        serviceHash="0x2986e65b3fe5edb46392c2685c7f45ef50b6d653781d7c1d6b12c06c920b81b3",
        txHash="0x693f91c947d546e97ba11525d8bd5ee3d2ce5c400835e2a939662feb3753b6c3",
        imageName="level3.png",
        description="Level 3 provides layers of defense through enhanced network routing, rate "
        "limiting and filtering that can be paired with advanced network-based detection "
        "and mitigation scrubbing center solutions. Our mitigation approach is informed by "
        "threat intelligence derived from visibility across our global infrastructure and "
        "data correlation. Tailored for any business and IT/security budget, our flexible "
        "managed service can proactively detect and mitigate the threats of today to help "
        "ensure business-as-usual for employees, partners and customers.",
        type=["REACTIVE"],
        features=["APPLICATION", "VOLUMETRIC"],
        region=["EUROPE"],
        deployment="MINUTES",
        leasingPeriod="DAYS",
        price=1200,
        currency="USD",
        mitigationRate=0.7,
    )

    service10 = Service(
        providerName="F5 Networks",
        serviceName="F5 Silverline DDoS Protection",
        serviceHash="hash9",
        imageName="f5.png",
        description=" F5’s DDoS Protection solution protects the fundamental elements of an application"
        " (network, DNS, SSL, and HTTP) against distributed denial-of-service attacks. "
        "Leveraging the intrinsic security capabilities of intelligent traffic management "
        "and application delivery, F5 protects and ensures availability of an "
        "organization's network and application infrastructure under the most "
        "demanding conditions",
        type=["REACTIVE"],
        features=["APPLICATION", "VOLUMETRIC"],
        region=["EUROPE"],
        deployment="HOURS",
        leasingPeriod="DAYS",
        price=890,
        currency="USD",
        mitigationRate=0.8,
    )

    service11 = Service(
        providerName="SolarWinds",
        serviceName="Access Rights Manager",
        serviceHash="hash10",
        imageName="solarwinds.png",
        description="SolarWinds provides a solution for the Access Rights Management (ARM) in Microsoft and virtual server environments "
        "which protects companies against unauthorized access to sensitive data. 8MAN‘s key functions are permission"
        "analysis, security monitoring, documentation and reporting, role & key process optimization, and user provisioning. "
        "Developed in Germany by Protected Networks this software solution sets the standards for professional "
        "network security and agile IT organization. It also offers state-of-the-art functionality while fulfilling "
        "established security and compliance guidelines.",
        type=["PROACTIVE"],
        features=["DATA BREACH"],
        region=["EUROPE"],
        deployment="HOURS",
        leasingPeriod="MONTHS",
        price=1496,
        currency="USD",
        mitigationRate=0.7,
    )

    service12 = Service(
        providerName="Sophos",
        serviceName="Sophos Network Antivirus Protection",
        serviceHash="hash11",
        imageName="sophos.png",
        description="Sophos antivirus protection for networks is built to stop ransomware, viruses, and advanced "
        "malware attacks in their tracks. Combining the industry's leading malware detection with "
        "endpoint detection and response (EDR), Sophos will future-proof your organization against "
        "both new and old threats. EDR enables you to take threat hunting to the next level, detecting "
        "and investigating suspicious activity with AI-driven and expert analysis. Stay ahead of the "
        "latest threats without adding headcount.",
        type=["PROACTIVE"],
        features=["RANSOMWARE", "VIRUS", "MALWARE"],
        region=["EUROPE"],
        deployment="HOURS",
        leasingPeriod="MONTHS",
        price=1300,
        currency="USD",
        mitigationRate=0.6,
    )

    service13 = Service(
        providerName="Allot",
        serviceName="Network Secure",
        serviceHash="hash12",
        imageName="allot.png",
        description="Users of mobile networks require protection from malware, phishing "
        "and other cyberattacks more than ever. It is no surprise that "
        "consumer concern is high. Service providers who attempted to "
        "address the issue with client-based security discovered that "
        "consumers didn’t buy-in and the adoption rates were low because "
        "hey want a simple, transparent, zero-touch service that only a network-based service can deliver.",
        type=["PROACTIVE"],
        features=["MALWARE", "PHISHING", "SPYWARE", "BOTNET"],
        region=["EUROPE"],
        deployment="DAYS",
        leasingPeriod="MONTHS",
        price=1500,
        currency="USD",
        mitigationRate=0.8,
    )

    service14 = Service(
        providerName="Actifio",
        serviceName="Actifio GO",
        serviceHash="hash13",
        imageName="actifio.png",
        description="Actifio GO is a Google Cloud backup and disaster recovery offering which "
        "enables powerful data protection for Google Cloud and hybrid workloads. "
        "Actifio GO supports Google workloads such as Compute Engine and VMware Engine, "
        "as well as hybrid workloads like VMware, SAP HANA, Oracle and SQL Server, and others.",
        type=["PROACTIVE"],
        features=["DATA BREACH"],
        region=["NORTH AMERICA", "EUROPE", "ASIA"],
        deployment="DAYS",
        leasingPeriod="MONTHS",
        price=1600,
        currency="USD",
        mitigationRate=0.7,
    )

    service15 = Service(
        providerName="Portwell",
        serviceName="Anti-Spam, Virus, Spyware",
        serviceHash="hash14",
        imageName="portwell.png",
        description="Implemented on Secure Web Gateways (SWG), a gateway appliance, to scan all "
        "incoming network data and prevent malware threats."
        "For anti-malware, Portwell has desktop appliances with PoE and performance with "
        "Intel Atom® SoC.",
        type=["PROACTIVE"],
        features=["MALWARE", "RANSOMWARE", "VIRUS", "SPYWARE"],
        region=["NORTH AMERICA", "EUROPE", "ASIA"],
        deployment="DAYS",
        leasingPeriod="MONTHS",
        price=820,
        currency="USD",
        mitigationRate=0.8,
    )

    review1 = Review(
        service_id=9,
        fileName="fingerprint.json",
        fileData=bytearray(),
        rating=1,
        comment="Comment#1",
    )
    review2 = Review(
        service_id=9,
        fileName="fingerprint.json",
        fileData=bytearray(),
        rating=1,
        comment="Comment#2",
    )

    with app.app_context():
        db.session.add(review1)
        db.session.add(review2)
        db.session.commit()

    set_image(service1)
    set_image(service2)
    set_image(service3)
    set_image(service4)
    set_image(service5)
    set_image(service6)
    set_image(service7)
    set_image(service8)
    set_image(service9)
    set_image(service10)
    set_image(service11)
    set_image(service12)
    set_image(service13)
    set_image(service14)
    set_image(service15)


def set_image(service):
    with store_context(store):
        with open(f"static/images/{service.imageName}", "rb") as f:
            service.image.from_file(f)
        db.session.add(service)
        db.session.commit()


# For testing purposes
def mock_services():
    sh = ServiceHelper([])
    for i in range(0, 1000):
        s = Service()
        s.id = i
        s.price = random.randint(0, 5000)
        s.type = "REACTIVE" if i % 2 == 0 else "PROACTIVE"
        s.region = [REGIONS[i % len(REGIONS)]]
        s.deployment = DEPLOYMENT_TIME[i % len(DEPLOYMENT_TIME)]
        s.leasingPeriod = LEASING_PERIOD[i % len(LEASING_PERIOD)]
        sh.services.append(s)
    return sh
