import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`:root {
    /* Ocean Blue */
    --color-brand-50: #e0f7fa; 
    --color-brand-100: #b2ebf2; 
    --color-brand-200: #80deea; 
    --color-brand-500: #26c6da; 
    --color-brand-600: #00acc1; 
    --color-brand-700: #007c91;
    --color-brand-800: #005662;
    --color-brand-900: #003944; 
  
    &.light-mode {
      /* gray */
      --color-gray-0: #fff;
      --color-gray-50: #f9fafb;
      --color-gray-100: #f3f4f6;
      --color-gray-200: #e5e7eb;
      --color-gray-300: #d1d5db;
      --color-gray-400: #9ca3af;
      --color-gray-500: #6b7280;
      --color-gray-600: #4b5563;
      --color-gray-700: #374151;
      --color-gray-800: #1f2937;
      --color-gray-900: #111827;
      
      --color-blue-100: #e0f2fe;
      --color-blue-700: #0369a1;
      --color-green-100: #dcfce7;
      --color-green-700: #15803d;
      --color-yellow-100: #fef9c3;
      --color-yellow-700: #a16207;
      --color-silver-100: #e5e7eb;
      --color-silver-700: #374151;
      --color-indigo-100: #e0e7ff;
      --color-indigo-700: #4338ca;
      
      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;
      
      --backdrop-color: rgba(255, 255, 255, 0.1);
      
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

      --image-grayscale: 0;
      --image-opacity: 100%;
    }

    &.dark-mode {
      --color-gray-0: #10141b;
      --color-gray-50:  #161b22;
      --color-gray-100: #1e242c;
      --color-gray-200: #2b323c;
      --color-gray-300: #3a4350;
      --color-gray-400: #505b6b;
      --color-gray-500: #6b7684;
      --color-gray-600: #98a0a9;
      --color-gray-700: #c1c7cd;
      --color-gray-800: #e4e7ea;
      --color-gray-900: #f6f7f8;
        
      --color-blue-100: #0a466d;
      --color-blue-700: #cceeff;
      --color-green-100: #14532d;
      --color-green-700: #d9f9e5;
      --color-yellow-100: #713f12;
      --color-yellow-700: #fdf6b2;
      --color-silver-100: #2a2f38;
      --color-silver-700: #e9ebed;
      --color-indigo-100: #312e81;
      --color-indigo-700: #dcd7ff;
        
      --color-red-100: #fcdcdc;
      --color-red-700: #a61b1b;
      --color-red-800: #871414;
   
      --backdrop-color: rgba(0, 0, 0, 0.3);
        
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
        
      --image-grayscale: 10%;
      --image-opacity: 90%;
    }
  
    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  
    /* Creating animations for dark mode */
    transition: background-color 0.3s, border 0.3s;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    font-family: "Poppins", sans-serif;
    color: var(--color-gray-700);
  
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }
  
  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }
  
  button {
    cursor: pointer;
  }
  
  *:disabled {
    cursor: not-allowed;
  }
  
  select:disabled,
  input:disabled {
    background-color: var(--color-gray-200);
    color: var(--color-gray-500);
  }
  
  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
  
  /* Parent selector, finally 😃 */
  button:has(svg) {
    line-height: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  ul {
    list-style: none;
  }
  
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }
  
  img {
    max-width: 100%;
  
    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }
  
  `;

export default GlobalStyles;
