import React from 'react'
import { BsArrowDownRight } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Thể thao',
    desc: 'Khám phá bộ sưu tập giày thể thao đa dạng với thiết kế hiện đại và chất liệu bền bỉ, phù hợp cho mọi hoạt động.',
    href: '/category/sports',
  },
  {
    num: '02',
    title: 'Giày Sneaker',
    desc: 'Những mẫu giày sneaker thời trang, dễ phối đồ, mang đến phong cách trẻ trung và năng động.',
    href: '/category/sneakers',
  },
  {
    num: '03',
    title: 'Giày công sở',
    desc: 'Sang trọng và tinh tế, bộ sưu tập giày công sở giúp bạn tự tin trong mọi cuộc gặp gỡ.',
    href: '/category/formal',
  },
  {
    num: '04',
    title: 'Khuyến mãi',
    desc: 'Đừng bỏ lỡ các chương trình khuyến mãi hấp dẫn, mua giày chính hãng với mức giá ưu đãi.',
    href: '/category/sale',
  },
];

const Services = () => {
  return (
    <section className='min-h-[90vh] flex flex-col justify-center py-12 xl:py-0 bg-slate-700 border-t-2'>
      <div className="container mx-auto bg-slate-700">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1, transition: {
              delay: 1.4,
              duration: 0.4,
              ease: 'easeIn'
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((services, index) => {
            return <div key={index} className="flex flex-1 flex-col justify-center gap-6 group">
              {/* top */}
              <div className='w-full flex justify-between items-center'>
                <div className='text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500'>
                  {services.num}
                </div>
                <NavLink href={services.href} className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                  <BsArrowDownRight className='text-primary text-3xl '></BsArrowDownRight>
                </NavLink>
              </div>
              {/* title */}
              <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>{services.title}</h2>
              {/* desc */}
              <p className='text-white/60'>{services.desc}</p>
              {/* border */}
              <div className='border-b border-white/20 w-full'>

              </div>
            </div>
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services