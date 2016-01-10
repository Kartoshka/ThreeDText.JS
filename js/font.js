
var A = [[0,0],[0,1],[0,2],[0,3],[1,4],[2,4],[3,3],[3,2],[3,1],[3,0],[1,2],[2,2]];

var B = [[0,0],[1,0],[2,0],[0,1],[3,1],[0,2],[1,2],[2,2],[0,3],[3,3],[0,4],[1,4],[2,4]];

var C = [[1,0],[2,0],[3,0],[0,1],[0,2],[0,3],[1,4],[2,4],[3,4]];

var E =[[0,0],[1,0],[2,0],[3,0],[0,1],[0,2],[1,2],[2,2],[0,3],[0,4],[1,4],[2,4],[3,4]];

var D =[[0,0],[1,0],[2,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,4],[3,1],[3,2],[3,3]];

var F =[[0,0],[0,1],[0,2],[1,2],[2,2],[0,3],[0,4],[1,4],[2,4],[3,4]];

var G =[[1,0],[2,0],[3,0],[0,1],[3,1],[0,2],[2,2],[3,2],[0,3],[1,4],[2,4],[3,4]];

var H= [[0,0],[0,1],[0,2],[0,3],[0,4],[3,0],[3,1],[3,2],[3,3],[3,4],[1,2],[2,2]];

var I= [[2,0],[2,1],[2,2],[2,3],[2,4]];

var J = [[3,1],[3,2],[3,3],[3,4],[0,1],[1,0],[2,0]];
	
var K= [[0,0],[0,1],[0,2],[0,3],[0,4],[1,2],[2,1],[2,3],[3,0],[3,4]];

var L= [[0,0],[0,1],[0,2],[0,3],[0,4],[1,0],[2,0],[3,0]];

var M=[[0,0],[0,1],[0,2],[0,3],[0,4],[4,0],[4,1],[4,2],[4,3],[4,4],[1,3],[2,2],[3,3]];

var N =[[0,0],[0,1],[0,2],[0,3],[0,4],[3,0],[3,1],[3,2],[3,3],[3,4],[1,3],[2,2]];

var O =[[1,0],[2,0],[0,1],[0,2],[0,3],[1,4],[2,4],[3,1],[3,2],[3,3]];

var S = [[0,0],[1,0],[2,0],[3,1],[2,2],[1,2],[0,3],[1,4],[2,4],[3,4]];

sentenceFactory = function(string,size,blockSize)
{

	var sentence =[];
	var newLine =0;
	string = string.toUpperCase();
	for(var i=0; i<string.length;i++)
	{
		if(string[i]=="\n")
			newLine++;
		else if(string[i]==" ")
		{
			sentence.push([999999999,9999999999],[999999999999,999999999]);
		}
		else
		{
		var char = getLetter(string[i]);
			for(var c=0; c<char.length;c++)
			{
				sentence.push([char[c][0]*blockSize+size*i,char[c][1]*blockSize+size*newLine])
			}
		}
	}
	return sentence;
};

getLetter = function(letter)
{

	switch(letter){
		case "A":
		return A;
		case "B":
		return B;
		case "C":
		return C;
		case "D":
		return D;
		case "E":
		return E;
		case "F":
		return F;
		case "G":
		return G;
		case "H":
		return H;
		case "I":
		return I;
		case "J":
		return J;
		case "K":
		return K;
		case "L":
		return L;
		case "M":
		return M;
		case "N":
		return N;
		case "O":
		return O;
		case "S":
		return S;
	}
};
				