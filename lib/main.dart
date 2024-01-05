import 'dart:math';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:vector_math/vector_math.dart' as v_math;

late FragmentProgram program;

Future<void> main()async {

  program = await FragmentProgram.fromAsset(
    'assets/my_shader.frag',
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {




  @override
  Widget build(BuildContext context) {
    return Scaffold(
  backgroundColor: Colors.black,
      body: Center(
        child:Container(
          padding: const EdgeInsets.all(20),
          width: min(MediaQuery.of(context).size.width, MediaQuery.of(context).size.height),
          height: min(MediaQuery.of(context).size.width, MediaQuery.of(context).size.height),
          child:  GestureDetector(
            onTapDown: (details){
              print(details.globalPosition);
            },
    child: CustomPaint(
            painter: MyPainter(
              shader: program.fragmentShader(),
            ),

          ),
          ),
        )
      ),
    // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

class MyPainter extends CustomPainter{


  FragmentShader shader;

  MyPainter({required this.shader});

  @override
  void paint(Canvas canvas, Size size) {

    double width = size.width;
    double height = size.height;
    double centerX = width/2;
    double centerY = height/2;

    shader.setFloat(0, width);
    shader.setFloat(1, height);


  canvas.drawRect(Rect.fromLTWH(0, 0, width, height), Paint()..shader = shader);


  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;

}


