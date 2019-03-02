import Layout from "../components/layout";
import Carousel from "../components/carousel";
export default class extends React.Component {
  state = {
    currentImage: 1,
    imageCount: 4,
    imageBaseName: "wimg-"
  };

  goRight = () => {
    this.setState(state => ({
      currentImage:
        state.currentImage < state.imageCount ? (state.currentImage += 1) : 1
    }));
  };

  goLeft = () => {
    this.setState(state => ({
      currentImage:
        state.currentImage > 1 ? (state.currentImage -= 1) : state.imageCount
    }));
  };

  render() {
    const { currentImage, imageBaseName } = this.state;
    return (
      <Layout>
        <section className="title">
          <h1>About page</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </section>
        <Carousel
          image={imageBaseName + currentImage + ".jpg"}
          goLeft={this.goLeft}
          goRight={this.goRight}
        />

        <style jsx>{`
          section.title {
            text-align: center;
            margin-top: 1rem;
          }
        `}</style>
      </Layout>
    );
  }
}
