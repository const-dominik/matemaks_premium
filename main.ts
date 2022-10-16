(async () => {
    const getNthParent = (element: Element, n: number): Element | false => {
        const parent = element.parentElement;
        if (parent) {
            return n === 0 ? element : getNthParent(parent, n - 1);
        }
        return false;
    }
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const reverseStr = (str: string) => str.split("").reverse().join("");

    const makeYtButtons = () => {
        const prems = Array.from(document.querySelectorAll("a.but.b_prem"));
        prems.forEach(prem => {
            const zadanie = getNthParent(prem, 2);
            if (zadanie) {
                const ytIdBackwards = zadanie.getAttribute("yt");
                if (ytIdBackwards) {
                    const ytId = reverseStr(ytIdBackwards);
                    const ytHref = `https://www.youtube.com/watch?v=${ytId}`;
                    prem.setAttribute("href", ytHref);
                    prem.setAttribute("target", "_blank");
                    prem.className = "but b_yt";
                    prem.textContent = "Obejrzyj na Youtubie";
                }
            }
        });
    }

    const getHtml = async () => {
        const parser = new DOMParser();
        while (true) {
            const request = await fetch(window.location.href);
            if (!request || !request.ok) {
                await sleep(100);
                continue;
            }
            const data = await request.text();
            const document = parser.parseFromString(data, "text/html");
            return document;
        }
    }

    const HTML = await getHtml();
    const oldNodes = document.querySelectorAll(".zadanie[yt]");
    const newNodes = HTML.querySelectorAll(".zadanie[yt]");

    oldNodes.forEach((node, index) => node.setAttribute("yt", newNodes[index].getAttribute("yt") || ""));
    makeYtButtons();
})();