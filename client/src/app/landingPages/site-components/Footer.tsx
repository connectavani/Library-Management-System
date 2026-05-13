function Footer() {
  return (
    <footer className='bg-[#2c333a]'>
      {/* Bottom Bar */}
      <div className='bg-[#212121] text-white py-4 text-center text-sm'>
        Avantika Lad
        {/* 🔗 Social Links */}
        <span className='mx-2'>|</span>
        <a
          href='https://github.com/connectavani'
          className='text-white hover:text-[#ff680B] underline hover:no-underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub
        </a>
        <span className='mx-2'>|</span>
        <a
          href='https://www.linkedin.com/in/avantika-lad'
          className='text-white hover:text-[#ff680B] underline hover:no-underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
