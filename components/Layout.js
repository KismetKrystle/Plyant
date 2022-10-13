import Navbar from './Navbar';
import Seo from './Seo';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Seo />
      {children}
    </>
  );
}
