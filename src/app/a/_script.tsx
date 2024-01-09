import Script from "next/script";

// type Props = {}

const InlineScript = () => {
  return (
    <Script id="highlight">
      {`
      let prevUrl = undefined;
      setInterval(() => {
        const currUrl = window.location.href;
        if (currUrl != prevUrl) {
          // URL changed
          prevUrl = currUrl;
          const navBtns = document.querySelectorAll("button.nav");
          [...navBtns].forEach((b) => {
            b.classList.remove("active");
          });
          const path = location.pathname;
          const links = document.querySelectorAll(\`a[href='$\{path\}']\`);
          if (links.length) {
            [...links].forEach((link) => {
              link.parentElement?.classList.add("active");
            });
          }
        }
      }, 60);
     `}
    </Script>
  );
};

export default InlineScript;
