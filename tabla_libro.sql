-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2021 a las 21:22:55
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prestamolibros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `persona_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`id`, `nombre`, `descripcion`, `categoria_id`, `persona_id`) VALUES
(1, 'OJALA ESTA FUERA NUESTRA HISTORIA DE AMOR', 'Una historia conmovedora, bella y dolorosa sobre la vida, la muerte y el amor.', 1, NULL),
(2, 'EL SILENCIO DE NUESTRAS PALABRAS', 'Una novela de alto voltaje emocional que une a un grupo de personas a través de una situación extrema.', 1, NULL),
(3, 'LOS TRES MOSQUETEROS', 'La novela narra las aventuras de un joven gascón de 18 años, conocido como d\'Artagnan, que se va a París para hacerse mosquetero', 3, NULL),
(4, 'LA VUELTA AL MUNDO EN 80 DIAS', 'Las peripecias del británico Phileas Fogg y de su ayudante Jean Passepartout, llamado también Picaporte en castellano, constituyen uno de los relatos más cautivantes producidos por la imaginación humana, y una de las joyas de la literatura.', 3, NULL),
(5, 'YO, ROBOT', 'Yo, robot es una colección de relatos basados en las tres leyes de la robótica que son un compendio fijo e imprescindible de moral aplicable a supuestos robots inteligentes', 2, NULL),
(6, 'CRONICAS MARCIANAS', 'Una recopilación de relatos que tienen algo en común: están ambientados en un planeta Marte colonizado por el ser humano', 2, NULL),
(7, 'EL FUTURO DIGITAL', 'Describe perfectamente una revolución tecnológica que ya está en marcha', 11, NULL),
(8, 'EL FUTURO DIGITAL', 'Describe perfectamente una revolución tecnológica que ya está en marcha', 11, NULL),
(9, 'EL PODER Y LAS NUEVAS TECNOLOGIAS', 'el poder como dominación o como potencia y posibilidad de colaboración', 11, NULL),
(10, 'EL SILCENCIO DE LA CIUIDAD BLANCA', ' brillante arqueólogo condenado por los asesinatos que aterrorizaron Vitoria hace dos décadas, está a punto de salir de prisión cuando los crímenes se reanudan.', 12, NULL),
(11, 'EL NOMBRE DE LA ROSA', ' Ambientada en el turbulento ambiente religioso del siglo XIV, la novela narra la investigación que realizan fray Guillermo de Baskerville y su pupilo Adso de Melk alrededor', 12, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `persona_id` (`persona_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `libro_ibfk_2` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
