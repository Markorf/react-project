import Layout from "../components/Layout";

const About = () => (
  <Layout>
    <h1>About page!</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et veritatis
      quis, quasi adipisci, obcaecati expedita, aliquam magni voluptatum eveniet
      tempora saepe porro alias sunt quo? Vel explicabo unde blanditiis atque?
    </p>
    <img src="../static/img.gif" alt="somepic" />
    <style jsx>{`
      h1 {
        color: orange;
      }
      img {
        height: 150px;
      }
    `}</style>
  </Layout>
);

export default About;
