Rebuild ../tailwind.css after adding/changing Tailwind classes in any HTML page:

    npm i --no-save tailwindcss@3.4.17 @tailwindcss/forms@0.5.10 @tailwindcss/container-queries@0.1.1
    npx tailwindcss -c tools/tailwind.config.js -i tools/in.css -o tailwind.css --minify

Run from the stitch/ directory.
