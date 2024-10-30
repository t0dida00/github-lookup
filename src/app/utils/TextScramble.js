import { useEffect, useRef } from "react";

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = "+-*/abcdefghijkh";
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        this.promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];

        // Sequentially process each character in order
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = i * 20;  // Create a small delay for each character
            const end = start + Math.floor(Math.random() * 8); // Randomize the end

            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return this.promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            // Animate the character one by one in sequence
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

const TextScrambleFunc = ({ text, delay = 100 }) => {
    const textRef = useRef(null);
    useEffect(() => {
        const el = textRef.current;
        const fx = new TextScramble(el);
        fx.setText(text);
        return () => {
        };
    }, [text]); // Only depend on text for re-running the effect

    return (
        <div className="text-center md:text-left">
            <h1>
                <span ref={textRef} className='color-black font-[16px]' ></span>
                <br />
            </h1>
        </div>
    );
}
export default TextScrambleFunc