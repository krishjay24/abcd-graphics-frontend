export default function EndCards() {
  return (
    <div className="end-cards-section">
      <div>
        <div className="end-card  border-r border-solid border-[#ffd0d0]">
          <div>
            <script src="https://cdn.lordicon.com/lordicon.js"></script>
            <lord-icon
              src="https://cdn.lordicon.com/utpmnzxz.json"
              trigger="loop"
              delay="1500"
              colors="primary:#ffffff"
              style={{ width: "80px", height: "80px" }}></lord-icon>
          </div>
          <h2 className="end-cards-heading">
            <span>Total</span> <span>Convenience</span>
          </h2>
          <p className="end-cards-content">
            I just need words. I can put a project to life. Explain. Expect.
            Extradite <i>(couldn’t find another rhyming word).</i>
          </p>
        </div>
        <div className="end-card border-r border-solid border-[#ffd0d0]">
          <h2 className="end-cards-heading">
            <span>No Hidden</span> <span>Costs</span>
          </h2>
          <p className="end-cards-content">
            None whatsoever. Even I don’t believe in awkward conversations.
          </p>
        </div>
        <div className="end-card border-r border-solid border-[#ffd0d0]">
          <h2 className="end-cards-heading">
            <span>Super</span> <span>Certified</span>
          </h2>
          <p className="end-cards-content">
            I’m not just certified, I’m super certified. I’ve kept all my
            certificates in a secret vault, the same one that houses KFC and
            Coca-Cola recipes.
          </p>
        </div>
        <div className="end-card ">
          <h2 className="end-cards-heading">
            <span>Peace </span> <span>of mind</span>
          </h2>
          <p className="end-cards-content">
            Lastly, my experience talks for myself. Just sit back, relax, and
            drink that coffee, it’s getting cold!
          </p>
        </div>
      </div>
    </div>
  );
}
