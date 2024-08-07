import React, { useState, useEffect } from 'react'
import leftButton from '../assets/icons/leftButton.svg'
import rightButton from '../assets/icons/rightButton.svg'


const classes = {
  CarouselMain: 'hidden sm:block rounded-3xl overflow-hidden relative',
  CarouselContainer: 'flex w-full h-full transition-transform ease-out duration-500 ',
  ButtonsContainer: 'absolute top-1/2 transform -translate-y-1/2 px-4 flex items-center justify-between w-full',
  ButtonBG: 'flex items-center justify-center',
  leftButton: 'xl:w-16 lg:w-14 md:w-12 w-10',
  rightButton: 'xl:w-16 lg:w-14 md:w-12 w-10',
  DotsContainer: 'absolute bottom-4 right-0 left-0',
  Dots: 'flex items-center justify-center xl:gap-2 lg:gap-1.5  gap-1',
}

const Carousel = ({ children: slides, autoSlide = false, autoSlideInterval = 3000}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  //prevSlide and nextSlide functions
  const prev = () => setCurrentSlide((currentSlide) => (currentSlide == 0 ? slides.length - 1 : currentSlide - 1))
  const next = () => setCurrentSlide((currentSlide) => (currentSlide == slides.length - 1 ? 0 : currentSlide + 1))
  
  //autoSlide defaultInterval=3000
  useEffect(() => {
    if(!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval) 
    return () => clearInterval(slideInterval)
  })

  return (
  <div className={classes.CarouselMain}>
    <div className={classes.CarouselContainer} style={{ transform: `translateX(-${currentSlide * 100}%)`}}>
      {slides}
    </div>
    <div className={classes.ButtonsContainer}>
      <button className={classes.ButtonBG} onClick={prev}>
        <img className={classes.leftButton} src={leftButton} alt="" />
      </button>
      <button className={classes.ButtonBG} onClick={next}>
      <img className={classes.rightButton} src={rightButton} alt="" />
      </button>
    </div>
    <div className={classes.DotsContainer}>
      <div className={classes.Dots}>
        {slides.map((_, index) => (
          <button className={`transition-all xl:w-3 xl:h-3 lg:w-2.5 lg:h-2.5 md:w-2 md:h-2 sm:w-1.5 sm:h-1.5 bg-white rounded-full ${currentSlide === index ? "" : "bg-opacity-50"}`}  key={index} onClick={() => setCurrentSlide(index)}></button>
        ))} 
      </div>
    </div>
  </div>
  )
}

export default Carousel